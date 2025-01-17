import { Injectable, HttpStatus, RawBodyRequest } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import Stripe from "stripe";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "../schemas/auth.schema";
import { subscriptionDocument } from "../schemas/subscriptions.schema";

interface PlanConfig {
  storage: number;
  creditsLimit: number;
}

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private redirectUrl: string;
  private webhookSecret: string;
  private SUBSCRIPTION_PLANS: Record<string, string>;
  private PLAN_LIMITS: Record<string, PlanConfig>;

  constructor(
    @InjectModel("Subscription")
    private subscriptionModel: Model<subscriptionDocument>,
    @InjectModel("User") private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    const key =
      process.env.PROD === "true"
        ? process.env.STRIPE_SECRET_KEY_PROD
        : process.env.STRIPE_SECRET_KEY_DEV;
    if (!key) {
      throw new Error("Stripe secret key is not provided");
    }
    this.stripe = new Stripe(key, { apiVersion: "2024-12-18.acacia" });

    this.SUBSCRIPTION_PLANS = {
      Starter:
        process.env.PROD === "true"
          ? 'price_1QiBQZIyKmdahMOdXXg0imUC'
          : process.env.STARTER_PRICE_ID_DEV,
      Pro:
        process.env.PROD === "true"
          ? "price_1QiBPtIyKmdahMOdod0XFX31"
          : process.env.PRO_PRICE_ID_DEV,
      Business:
        process.env.PROD === "true"
          ? 'price_1QiBPSIyKmdahMOdgJvlGMcE'
          : process.env.BUSINESS_PRICE_ID_DEV,
    };

    this.PLAN_LIMITS = {
      Starter: { storage: 10, creditsLimit: 100 },
      Pro: { storage: 20, creditsLimit: 400 },
      Business: { storage: 40, creditsLimit: 800 },
    };
    this.redirectUrl =
      process.env.PROD === "true"
        ? process.env.NEXT_APP_URL_PROD!
        : process.env.NEXT_APP_URL_DEV!;
    this.webhookSecret =
      process.env.PROD === "true"
        ? process.env.STRIPE_WEBHOOK_SECRET_PROD
        : process.env.STRIPE_WEBHOOK_SECRET_DEV;
  }

  async handleWebhook(request: RawBodyRequest<Request>, response: Response) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"] as string,
        this.webhookSecret
      );

      switch (event.type) {
        case "invoice.payment_succeeded":
          await this.handlePaymentSucceeded(
            event.data.object as Stripe.Invoice
          );
          break;

        case "invoice.payment_failed":
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        case "customer.subscription.deleted":
          await this.handleSubscriptionEnded(
            event.data.object as Stripe.Subscription
          );
          break;
        case "customer.subscription.updated":
          await this.handleSubscriptionUpdated(
            event.data.object as Stripe.Subscription
          );
          break;
        default:
          console.log("Unhandled event type:", event.type);
      }

      response.status(HttpStatus.OK).send();
    } catch (error) {
      console.error("Webhook error:", error);
      response.status(400).send(`Webhook Error: ${error.message}`);
    }
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;
    const customer = await this.stripe.customers.retrieve(
      invoice.customer as string
    );

    if ("deleted" in customer) return;
    const userId = customer.metadata.userId;
    if (!userId) return;
    const planId = invoice.lines.data[0].plan.id;
    const planName = Object.entries(this.SUBSCRIPTION_PLANS).find(
      ([_, id]) => id === planId
    )?.[0];

    if (!planName) {
      console.error("Unknown plan ID", { planId });
      return;
    }
    await this.subscriptionModel.findOneAndUpdate(
      { userId },
      {
        plan: planName,
        status: "active",
        subscriptionId: invoice.subscription,
        currentPeriodEnd: new Date(invoice.period_end * 1000),
        price: invoice.total / 100,
        customerId: invoice.customer,
      },
      { upsert: true, new: true }
    );

    await this.userModel.updateOne(
      { _id: userId },
      { ...this.PLAN_LIMITS[planName], creditsUsed: 0 }
    );
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;
    await this.subscriptionModel.updateOne(
      { subscriptionId: invoice.subscription as string },
      { status: "inactive" }
    );
  }
  private async handleSubscriptionEnded(subscription: Stripe.Subscription) {
    const customer = await this.stripe.customers.retrieve(
      subscription.customer as string
    );

    if ("deleted" in customer) return;
    const userId = customer.metadata.userId;
    if (!userId) return;
    await this.subscriptionModel.updateOne({ userId }, { status: "ended" });
  }
  // handle the cancel and renew subscription from the stripe portal
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customer = await this.stripe.customers.retrieve(
      subscription.customer as string
    );

    if ("deleted" in customer) return;
    const userId = customer.metadata.userId;
    if (!userId) return;
    if (subscription.cancel_at_period_end) {
      await this.subscriptionModel.updateOne(
        { userId },
        { status: "canceled" }
      );
    } else {
      await this.subscriptionModel.updateOne({ userId }, { status: "active" });
    }
  }

  ////////////////////

  async createChekoutSession(
    plan: keyof typeof this.SUBSCRIPTION_PLANS,
    userId: string
  ) {
    try {
      console.log("----------> plan: ", this.SUBSCRIPTION_PLANS[plan]);
      const customerId = await this.findOrCreateCustomer(userId);

      const subscription = await this.subscriptionModel.findOne({ userId });
      if (subscription && subscription.status !== "ended") {
        return { url: `${this.redirectUrl}/dashboard` };
      }

      if (!Object.keys(this.SUBSCRIPTION_PLANS).includes(plan)) {
        throw new Error("Select a plan before proceeding");
      }
      const session = await this.stripe.checkout.sessions.create({
        line_items: [{ price: this.SUBSCRIPTION_PLANS[plan], quantity: 1 }],
        mode: "subscription",
        success_url: `${this.redirectUrl}/payment/successful`,
        cancel_url: this.redirectUrl,
        allow_promotion_codes: true,
        customer: customerId,
        metadata: { userId },
      });

      return { url: session.url! };
    } catch (error) {
      console.error("Checkout session error:", error);
      throw new Error(error.message);
    }
  }

  async checkSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({ userId });

    if (!subscription) return { isSubscribed: false, newToken: "" };

    if (subscription.status === "ended") {
      return { isSubscribed: false, newToken: "" };
    } else {
      return {
        isSubscribed: true,
        newToken: await this.generateSubscriptionToken(userId),
      };
    }
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({
      userId,
      status: "active",
    });

    if (!subscription) return { error: "No active subscription found" };

    await this.stripe.subscriptions.update(subscription.subscriptionId, {
      cancel_at_period_end: true,
    });

    await subscription.updateOne({ plan: "Starter", status: "canceled" });

    return { message: "Subscription cancelled successfully" };
  }

  async renewSubscription(userId: string) {
    try {
      const subscription = await this.getCanceledSubscription(userId);
      if (!subscription) return;

      await this.stripe.subscriptions.update(subscription.subscriptionId, {
        cancel_at_period_end: false,
      });

      await this.subscriptionModel.updateOne(
        { userId, status: "canceled" },
        { status: "active" }
      );

      return { message: "Subscription renewed successfully" };
    } catch (error) {
      console.error("Renew subscription error:", error);
    }
  }

  async mangeStripePortal(userId: string) {
    try {
      const subscription = await this.subscriptionModel.findOne({ userId });
      if (!subscription) return { error: "Subscription not found" };

      const session = await this.stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${this.redirectUrl}/dashboard`,
      });

      return { url: session.url!, message: "Billing portal session created" };
    } catch (error) {
      console.error("Manage billing error:", error);
      return { error: "Failed to manage billing" };
    }
  }

  // Private helper methods
  private async findOrCreateCustomer(userId: string): Promise<string> {
    const existingSubscription = await this.subscriptionModel.findOne({
      userId,
    });
    if (existingSubscription?.customerId)
      return existingSubscription.customerId;

    const customer = await this.stripe.customers.create({
      metadata: { userId },
    });
    return customer.id;
  }

  private async getCanceledSubscription(userId: string) {
    return this.subscriptionModel.findOne({
      userId,
      status: "canceled",
    });
  }

  private async generateSubscriptionToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId, isSubscribed: true },
      { expiresIn: "7d", secret: process.env.JWT_SECRET_KEY }
    );
  }
}

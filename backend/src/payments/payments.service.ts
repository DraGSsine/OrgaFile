import { Injectable, HttpStatus, RawBodyRequest } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import Stripe from "stripe";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "../schemas/auth.schema";
import { subscriptionDocument } from "../schemas/subscriptions.schema";
import { url } from "inspector";

interface PlanConfig {
  storage: number;
  requestLimit: number;
}

const SUBSCRIPTION_PLANS = {
  Basic: "price_1Q3MfoHbzmnInIZ1CsBh5rGj",
  Standard: "price_1Q3Mh3HbzmnInIZ1QvC4glTC",
  Premium: "price_1Q3MiPHbzmnInIZ1kdQAFHqH",
} as const;

const PLAN_LIMITS: Record<keyof typeof SUBSCRIPTION_PLANS, PlanConfig> = {
  Basic: { storage: 5, requestLimit: 100 },
  Standard: { storage: 15, requestLimit: 400 },
  Premium: { storage: 20, requestLimit: 500 },
};

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private redirectUrl: string;

  constructor(
    @InjectModel("Subscription")
    private subscriptionModel: Model<subscriptionDocument>,
    @InjectModel("User") private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-04-10",
    });
    this.redirectUrl =
      process.env.PROD === "true"
        ? process.env.NEXT_APP_URL_PROD!
        : process.env.NEXT_APP_URL_DEV!;
  }

  async handleWebhook(request: RawBodyRequest<Request>, response: Response) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"] as string,
        process.env.STRIPE_WEBHOOK_SECRET!
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
    await this.subscriptionModel.findOneAndUpdate(
      { userId },
      {
        status: "active",
        subscriptionId: invoice.subscription,
        currentPeriodEnd: new Date(invoice.period_end * 1000),
        price: invoice.total / 100,
        customerId: invoice.customer,
      },
      { upsert: true, new: true }
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
    await this.subscriptionModel.updateOne(
      { userId },
      { status: "ended" }
    );
  }

  ////////////////////

  async createChekoutSession(
    plan: keyof typeof SUBSCRIPTION_PLANS,
    userId: string
  ) {
    try {
      const customerId = await this.findOrCreateCustomer(userId);

      const subscription = await this.subscriptionModel.findOne({ userId });
      if (subscription && subscription.status !== "ended") {
        return { url: `${this.redirectUrl}` };
      }

      const session = await this.stripe.checkout.sessions.create({
        line_items: [{ price: SUBSCRIPTION_PLANS[plan], quantity: 1 }],
        mode: "subscription",
        success_url: `${this.redirectUrl}/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: this.redirectUrl,
        customer: customerId,
        metadata: { userId },
      });

      return { url: session.url! };
    } catch (error) {
      console.error("Checkout session error:", error);
      return { error: "Failed to create checkout session" };
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

    await subscription.updateOne({ plan: "Basic", status: "canceled" });

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
        return_url: this.redirectUrl,
      });

      return { url: session.url! };
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

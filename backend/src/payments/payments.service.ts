import { Injectable, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserDocument } from '../schemas/auth.schema';
import { subscriptionDocument } from '../schemas/subscriptions.schema';
import { JwtService } from '@nestjs/jwt';

const SUBSCRIPTION_PLANS = {
  Basic: "price_1Q3MfoHbzmnInIZ1CsBh5rGj",
  Standard: "price_1Q3Mh3HbzmnInIZ1QvC4glTC",
  Premium: "price_1Q3MiPHbzmnInIZ1kdQAFHqH",
} as const;

const PLAN_LIMITS = {
  Basic: { storage: 5, requestLimit: 100 },
  Standard: { storage: 15, requestLimit: 400 },
  Premium: { storage: 20, requestLimit: 500 },
} as const;

@Injectable()
export class PaymentService {
  private stripeClient: Stripe;

  constructor(
    @InjectModel('Subscription')
    private readonly subscriptionModel: Model<subscriptionDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });
  }

  async checkSubscription(userId: string) {
    try {
      const subscription = await this.subscriptionModel.findOne({
        userId,
        subscriptionStatus: 'active',
      }).sort({ currentPeriodEnd: -1 });

      if (!subscription || subscription.currentPeriodEnd < new Date()) {
        return { isSubscribed: false, newToken: null };
      }

      const newToken = await this.jwtService.signAsync(
        { userId, isSubscribed: true },
        { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
      );

      return { isSubscribed: true, newToken };
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { isSubscribed: false, newToken: null };
    }
  }

  private async findOrCreateCustomer(userId: string): Promise<string> {
    // First check if user already has a subscription with customer ID
    const existingSubscription = await this.subscriptionModel.findOne({ userId });
    if (existingSubscription?.customerId) {
      return existingSubscription.customerId;
    }

    // If no existing customer, create new one
    const customer = await this.stripeClient.customers.create({
      metadata: { userId },
    });
    return customer.id;
  }

  async createCheckoutSession(createPaymentDto: CreatePaymentDto, userId: string) {
    const redirectUrl = process.env.PROD === 'true'
      ? process.env.NEXT_APP_URL_PROD
      : process.env.NEXT_APP_URL_DEV;

    try {
      // Get existing customer or create new one
      const customerId = await this.findOrCreateCustomer(userId);

      // Check for active subscription
      const activeSubscription = await this.subscriptionModel.findOne({
        userId,
        subscriptionStatus: 'active',
      });

      if (activeSubscription) {
        return { error: 'User already has an active subscription' };
      }

      const session = await this.stripeClient.checkout.sessions.create({
        line_items: [{ price: SUBSCRIPTION_PLANS[createPaymentDto.plan], quantity: 1 }],
        mode: 'subscription',
        success_url: `${redirectUrl}/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${redirectUrl}`,
        customer: customerId,
        metadata: { userId },
      });

      return { url: session.url! };
    } catch (error) {
      console.error('Checkout session error:', error);
      return { error: 'Failed to create checkout session' };
    }
  }

  async handleWebhook(request: RawBodyRequest<Request>, response: Response) {
    const sig = request.headers['stripe-signature'] as string;

    try {
      const event = this.stripeClient.webhooks.constructEvent(
        request.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
      }

      response.status(HttpStatus.OK).send();
    } catch (error) {
      console.error('Webhook error:', error);
      response.status(400).send(`Webhook Error: ${error.message}`);
    }
  }

  private async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    try {
      const customerId = subscription.customer as string;
      const customerResponse = await this.stripeClient.customers.retrieve(customerId);

      if ('deleted' in customerResponse) {
        return;
      }

      const userId = customerResponse.metadata.userId;
      if (!userId) return;

      // Deactivate any existing subscriptions first
      await this.subscriptionModel.updateMany(
        { userId },
        { subscriptionStatus: 'inactive' }
      );

      await this.createNewSubscription(subscription, userId);
    } catch (error) {
      console.error('Handle subscription created error:', error);
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    try {
      const customerId = subscription.customer as string;
      const customerResponse = await this.stripeClient.customers.retrieve(customerId);
      
      if ('deleted' in customerResponse) {
        return;
      }

      const userId = customerResponse.metadata.userId;
      if (!userId) return;

      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      const existingSubscription = await this.subscriptionModel.findOne({
        subscriptionId: subscription.id,
      });

      if (existingSubscription) {
        await this.subscriptionModel.updateOne(
          { subscriptionId: subscription.id },
          {
            currentPeriodEnd,
            subscriptionStatus: subscription.status === 'active' ? 'active' : 'inactive'
          }
        );
      }
    } catch (error) {
      console.error('Handle subscription updated error:', error);
    }
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await this.subscriptionModel.updateOne(
      { subscriptionId: subscription.id },
      { subscriptionStatus: 'inactive' }
    );
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;

    await this.subscriptionModel.updateOne(
      { subscriptionId: invoice.subscription as string },
      { subscriptionStatus: 'inactive' }
    );
  }

  async createNewSubscription(subscription: Stripe.Subscription, userId: string) {
    const planId = subscription.items.data[0].price.id;
    const planName = Object.entries(SUBSCRIPTION_PLANS).find(
      ([_, id]) => id === planId
    )?.[0];

    if (!planName) return;

    try {
      const paymentMethod = await this.stripeClient.paymentMethods.list({
        customer: subscription.customer as string,
        type: 'card',
      });

      const card = paymentMethod.data[0]?.card;

      await this.subscriptionModel.create({
        userId,
        plan: planName,
        cardBrand: card?.brand || 'Unknown',
        cardLast4: card?.last4 || '0000',
        subscriptionStatus: subscription.status === 'active' ? 'active' : 'inactive',
        subscriptionId: subscription.id,
        customerId: subscription.customer as string,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        price: subscription.items.data[0].price.unit_amount! / 100,
      });

      await this.userModel.updateOne(
        { _id: userId },
        { ...PLAN_LIMITS[planName], requestUsed: 0 }
      );
    } catch (error) {
      console.error('Create new subscription error:', error);
    }
  }

  async cancelSubscription(userId: string) {
    try {
      const subscription = await this.subscriptionModel.findOne({
        userId,
        subscriptionStatus: 'active',
      });

      if (!subscription) {
        return { error: 'Subscription not found' };
      }

      const portalSession = await this.stripeClient.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: process.env.NEXT_APP_URL_PROD,
      });

      return { url: portalSession.url };
    } catch (error) {
      console.error('Cancel subscription error:', error);
      return { error: 'Could not cancel subscription' };
    }
  }
}
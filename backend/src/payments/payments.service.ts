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
      });

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

  async createCheckoutSession(createPaymentDto: CreatePaymentDto, userId: string) {
    const redirectUrl = process.env.PROD === 'true' 
      ? process.env.NEXT_APP_URL_PROD 
      : process.env.NEXT_APP_URL_DEV;

    try {
      const existingSubscription = await this.subscriptionModel.findOne({
        userId,
        subscriptionStatus: 'active',
      });

      if (existingSubscription) {
        return { url: redirectUrl };
      }

      const customer = await this.stripeClient.customers.create({
        metadata: { userId },
      });

      const session = await this.stripeClient.checkout.sessions.create({
        line_items: [{ price: SUBSCRIPTION_PLANS[createPaymentDto.plan], quantity: 1 }],
        mode: 'subscription',
        success_url: `${redirectUrl}/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${redirectUrl}`,
        customer: customer.id,
        metadata: { userId },
      });

      return { url: session.url! };
    } catch (error) {
      console.error('Checkout session error:', error);
      return { url: redirectUrl };
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
        case 'checkout.session.completed':
          await this.handleCheckoutSuccess(event.data.object as Stripe.Checkout.Session);
          break;
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
        case 'customer.subscription.deleted':
          await this.subscriptionModel.updateOne(
            { subscriptionId: event.data.object.id },
            { subscriptionStatus: 'inactive' }
          );
          break;
      }

      response.status(HttpStatus.OK).send();
    } catch (error) {
      console.error('Webhook error:', error);
      response.status(400).send(`Webhook Error: ${error.message}`);
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

  private async handleCheckoutSuccess(session: Stripe.Checkout.Session) {
    try {
      const subscription = await this.stripeClient.subscriptions.retrieve(
        session.subscription as string
      );
      const userId = session.metadata?.userId;
      
      if (!userId) return;

      const planId = subscription.items.data[0].price.id;
      const planName = Object.entries(SUBSCRIPTION_PLANS).find(
        ([_, id]) => id === planId
      )?.[0];

      if (!planName) return;

      await this.subscriptionModel.updateOne({
        userId,
        plan: planName,
        subscriptionStatus: 'active',
        subscriptionId: subscription.id,
        customerId: subscription.customer as string,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        price: subscription.items.data[0].price.unit_amount! / 100,
      });

      await this.userModel.updateOne(
        { _id: userId },
        { ...PLAN_LIMITS[planName] }
      );
    } catch (error) {
      console.error('Handle checkout error:', error);
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;

    await this.subscriptionModel.updateOne(
      { subscriptionId: invoice.subscription  as string },
      { subscriptionStatus: 'inactive' }
    );
  }
}
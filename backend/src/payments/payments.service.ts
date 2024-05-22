import { Injectable, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserDocument } from 'src/schemas/auth.schema';
import { subscriptionDocument } from 'src/schemas/subscriptions.schema';

@Injectable()
export class PaymentService {
  private stripeClient: Stripe;

  constructor(
    @InjectModel('Subscription')
    private readonly subscriptionModel: Model<subscriptionDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not defined in environment variables');
    }
    this.stripeClient = new Stripe(stripeSecretKey, {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckoutSession(
    createPaymentDto: CreatePaymentDto,
    userId: string,
  ): Promise<{ url: string }> {
    try {
      // Check if the user is already subscribed
      const existingSubscription = await this.subscriptionModel.findOne({
        userId,
        subscriptionStatus: 'active',
      });
      if (existingSubscription && existingSubscription.customerId) {
        console.log(
          'User is already subscribed, redirecting to billing portal',
        );
        try {
          const sessionPortal =
            await this.stripeClient.billingPortal.sessions.create({
              customer: existingSubscription.customerId,
              return_url: `${process.env.NEXT_APP_URL}/dashboard`,
            });
          return { url: sessionPortal.url! };
        } catch (error) {
          throw new Error(`Could not create billing portal session ${error} `);
        }
      }
      // Create a new Stripe customer
      const customer = await this.stripeClient.customers.create({
        metadata: { userId },
      });

      const session = await this.stripeClient.checkout.sessions.create({
        line_items: [
          {
            price: createPaymentDto.price_id,
            quantity: 1,
          },
        ],
        payment_method_types: ['card'],
        mode: 'subscription',
        success_url: `${process.env.NEXT_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        customer: customer.id,
        metadata: {
          userId: userId,
        },
      });

      return { url: session.url! };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Could not create checkout session');
    }
  }

  async handleWebhook(
    request: RawBodyRequest<Request>,
    response: Response,
  ): Promise<void> {
    const sig = request.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error(
        'Stripe webhook secret not defined in environment variables',
      );
      response
        .status(HttpStatus.BAD_REQUEST)
        .send('Webhook secret not configured');
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripeClient.webhooks.constructEvent(
        request.rawBody,
        sig,
        webhookSecret,
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`);
      return;
    }

    const session = event.data.object as Stripe.Checkout.Session;
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSession(session);
        break;
      case 'invoice.payment_succeeded':
        await this.handleInvoicePaymentSucceeded(session);
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
    response.status(HttpStatus.OK).send();
  }

  private async handleCheckoutSession(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    try {
      const subscription = await this.stripeClient.subscriptions.retrieve(
        session.subscription as string,
      );
      const userId = session.metadata?.userId;
      if (!userId) {
        console.warn(
          `UserId not found in session metadata for session: ${session.id}`,
        );
        return;
      }
      const plan = this.setPlanByItsId(subscription.items.data[0].price.id);
      await this.subscriptionModel.create({
        userId,
        plan,
        subscriptionStatus: 'active',
        subscriptionId: session.subscription?.toString(),
        customerId: subscription.customer as string,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      });
      const { storage, requestLimit } = this.setStorageBaseOnPlan(plan);
      await this.userModel.updateOne({ _id: userId }, { storage, requestLimit });
    } catch (error) {
      console.error('Error handling checkout session:', error);
    }
  }

  private async handleInvoicePaymentSucceeded(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    try {
      const subscription = await this.stripeClient.subscriptions.retrieve(
        session.subscription as string,
      );

      await this.subscriptionModel.updateOne(
        { customerId: subscription.customer as string },
        {
          subscriptionStatus: 'active',
          subscriptionId: session.subscription?.toString(),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      );
    } catch (error) {
      console.error('Error handling invoice payment succeeded:', error);
    }
  }

  private setPlanByItsId(priceId: string) {
    if (priceId == 'price_1PIwvSCRq7xCj4sRtnFgoawN') {
      return 'Basic';
    } else if (priceId == 'price_1PIwwvCRq7xCj4sRxgJYesQ8') {
      return 'Premium';
    } else if (priceId == 'price_1PIwwECRq7xCj4sRV1O6QKeK') {
      return 'Standard';
    } else {
      throw new Error('Invalid price ID');
    }
  }

  private setStorageBaseOnPlan(plan: string): {
    storage: number;
    requestLimit: number;
  } {
    if (plan == 'Basic') {
      return { storage: 5, requestLimit: 10 };
    } else if (plan == 'Standard') {
      return { storage: 10, requestLimit: 20 };
    } else if (plan == 'Premium') {
      return { storage: 20, requestLimit: 50 };
    } else {
      throw new Error('Invalid plan');
    }
  }
}

// src/payment/payment.service.ts

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { userDocument } from 'src/schemas/auth.schema';
import { AnyAaaaRecord } from 'dns';

@Injectable()
export class PaymentService {
  private stripeClient: Stripe;

  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async pay(createPaymentDto: CreatePaymentDto){
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: createPaymentDto.plan,
            },
            unit_amount: Math.round(createPaymentDto.price * 100),
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      client_reference_id: createPaymentDto.user_id,
      success_url: `${process.env.NEXT_APP_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: createPaymentDto.url_cancel,
    });

    const session_id = session.id;

    await this.userModel.updateOne(
      { _id: createPaymentDto.user_id },
      { paymentSessionId: session_id },
    );

    return { url: session.url,succesUrl:session.success_url};
  }

  async handleWebhook(request: Request, response: Response) {
    const sig = request.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      event = this.stripeClient.webhooks.constructEvent(request.body, sig, webhookSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return response.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await this.handleCheckoutSession(session);
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.status(HttpStatus.OK).send();
  }

  private async handleCheckoutSession(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id;
    await this.userModel.updateOne(
      { _id: userId },
      { subscriptionStatus: 'active' } // Update with your desired field and value
    );
    console.log('Payment was successful for user:', userId);
  }
}

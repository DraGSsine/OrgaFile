import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stripe } from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { userDocument } from 'src/schemas/auth.schema';

@Injectable()
export class PaymentService {
  private stripeClient: Stripe;

  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async pay(createPaymentDto: CreatePaymentDto): Promise<{ url: string }> {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
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
      mode: 'subscription',
      client_reference_id: createPaymentDto.user_id,
      success_url: createPaymentDto.url_success,
      cancel_url: createPaymentDto.url_cancel,
    });
    const session_id = session.id;
    await this.userModel.updateOne(
      { _id: createPaymentDto.user_id },
      { paymentSessionId:session_id },
    );
    return { url: session.url };
  }

  async createOrder(body: any) {
    const user_id = body.user_id
    const { paymentSessionId } = await this.userModel.findOne({ _id: user_id }).select('paymentSessionId').lean();
    const {subscription,id,customer,status} = await this.stripeClient.checkout.sessions.retrieve(paymentSessionId);
    const list = await this.stripeClient.checkout.sessions.listLineItems(paymentSessionId);
    // await this.userModel.updateOne({_id: user_id},{plan:subscription.plan.product});
    return ({subscription,id,customer,status,list});
  
    // const session = await this.stripeClient.checkout.sessions.retrieve(session_id);

  }
}

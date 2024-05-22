import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type subscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true })
  userId: string;

  @Prop()
  @Prop({ enum: ['Basic', 'Standard', 'Premium'] })
  plan: 'Basic' | 'Standard' | 'Premium';

  @Prop({ default: 'inactive', enum: ['active', 'inactive'] })
  subscriptionStatus: 'active' | 'inactive';

  @Prop()
  currentPeriodEnd: Date;

  @Prop()
  subscriptionId: string;

  @Prop()
  customerId: string;
}

export const subscriptionSchema = SchemaFactory.createForClass(Subscription);

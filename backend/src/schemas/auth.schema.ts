import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  signInFor: 'Projects' | 'Designs';

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  plan: 'Basic' | 'Standard' | 'Premium';

  @Prop({ required: true })
  paymentSessionId: string;

  @Prop({ required: true })
  storage: number;

  @Prop({ required: true })
  storageUsed: number;
  @Prop({ required: true , default: 'inactive'})
  subscriptionStatus: 'active' | 'inactive';
  @Prop({ required: true })
  requestLimit: number;
}

export const userSchema = SchemaFactory.createForClass(User);

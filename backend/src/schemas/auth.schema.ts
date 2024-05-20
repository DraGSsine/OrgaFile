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

  @Prop()
  plan: 'Basic' | 'Standard' | 'Premium';

  @Prop()
  paymentSessionId: string;

  @Prop()
  storage: number;

  @Prop()
  storageUsed: number;
  @Prop({default: 'inactive'})
  subscriptionStatus: 'active' | 'inactive';
  @Prop()
  requestLimit: number;
}

export const userSchema = SchemaFactory.createForClass(User);

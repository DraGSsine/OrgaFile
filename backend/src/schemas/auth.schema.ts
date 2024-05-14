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

  @Prop()
  field: string;
}

export const userSchema = SchemaFactory.createForClass(User);

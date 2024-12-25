import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  fullName: string;
  @Prop({
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: 0})
  storage: number;

  @Prop({ default: 0 })
  storageUsed: number;

  @Prop({default: 0})
  creditsLimit: number;

  @Prop({ default: 0 })
  creditsUsed: number;
  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  @Prop()
  profilePictureUrl: string;

  @Prop({ default: false })
  isEmailVerified: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type userDocument = User & Document;
@Schema()
export class Files {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  format: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  topic: string;
}

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

  @Prop({ type: [Files], default: [] })
  files: Files[];
  
  @Prop({ type:[Files],default:[]})
  deletedFiles:Files[];
}

export const userSchema = SchemaFactory.createForClass(User);

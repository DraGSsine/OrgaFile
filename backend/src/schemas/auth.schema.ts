import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type fileType = {
  url: string;
  name: string;
  size: number;
  format: string;
  createdAt: Date;
};
export type userDocument = user & Document;

@Schema()
export class user {
  @Prop({ required: true })
  signInFor: 'Projects' | 'Designs';
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  field: string;
  @Prop({ required: false })
  files: fileType[];
}

export const userSchema = SchemaFactory.createForClass(user);

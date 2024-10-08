import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type FileDocument = File & Document;

export class FileInfo {
  @Prop({ required: true, unique: true })
  fileId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  format: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true })
  keyEntities: string[];

  @Prop({ required: true })
  summary: string;
}

@Schema()
export class File {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;

  @Prop({ type: [{ type: FileInfo }], default: [] })
  files: FileInfo[];
}

export const fileSchema = SchemaFactory.createForClass(File);

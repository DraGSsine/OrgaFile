import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { fileSchema } from './files.schema';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [fileSchema], default: [] })
  files: File[];
}

export const folderSchema = SchemaFactory.createForClass(Folder);

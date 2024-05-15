import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { FileInfo, fileSchema } from './files.schema';

export type FolderDocument = Folder & Document;

export class FolderInfo {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  folderId: ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ type: [fileSchema], default: [] })
  files: FileInfo[];
  @Prop({ required: true })
  numberOfFiles: number;
}

@Schema()
export class Folder {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;
  @Prop({ type: [FolderInfo], default: [] })
  folders: FolderInfo[];
}

export const folderSchema = SchemaFactory.createForClass(Folder);

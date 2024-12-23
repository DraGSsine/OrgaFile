import mongoose, { Document, ObjectId } from 'mongoose';
import { FileInfo } from './files.schema';
export type FolderDocument = Folder & Document;
export declare class FolderInfo {
    folderId: ObjectId;
    name: string;
    files: FileInfo[];
    numberOfFiles: number;
    confidence: number;
}
export declare class Folder {
    userId: ObjectId;
    folders: FolderInfo[];
}
export declare const folderSchema: mongoose.Schema<Folder, mongoose.Model<Folder, any, any, any, mongoose.Document<unknown, any, Folder> & Folder & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Folder, mongoose.Document<unknown, {}, mongoose.FlatRecord<Folder>> & mongoose.FlatRecord<Folder> & {
    _id: mongoose.Types.ObjectId;
}>;

/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document, ObjectId } from 'mongoose';
import { FileInfo } from './files.schema';
export type FolderDocument = Folder & Document;
export declare class FolderInfo {
    folderId: ObjectId;
    name: string;
    files: FileInfo[];
    numberOfFiles: number;
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

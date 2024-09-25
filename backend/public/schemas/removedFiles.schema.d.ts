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
import mongoose, { Document } from 'mongoose';
export type RemovedFilesDocument = RemovedFiles & Document;
export declare class FileInfo {
    fileId: string;
    name: string;
    url: string;
    format: string;
    size: number;
    createdAt: Date;
    topic: string;
}
export declare class RemovedFiles {
    userId: object;
    files: FileInfo[];
}
export declare const removedFilesSchema: mongoose.Schema<RemovedFiles, mongoose.Model<RemovedFiles, any, any, any, mongoose.Document<unknown, any, RemovedFiles> & RemovedFiles & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RemovedFiles, mongoose.Document<unknown, {}, mongoose.FlatRecord<RemovedFiles>> & mongoose.FlatRecord<RemovedFiles> & {
    _id: mongoose.Types.ObjectId;
}>;

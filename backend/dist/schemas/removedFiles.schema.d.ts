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

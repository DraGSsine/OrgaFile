import mongoose, { Document, ObjectId } from 'mongoose';
export type FileDocument = File & Document;
export declare class FileInfo {
    fileId: string;
    name: string;
    url: string;
    format: string;
    size: number;
    createdAt: Date;
    topic: string;
    keyEntities: string[];
    summary: string;
    documentType: string;
}
export declare class File {
    userId: ObjectId;
    files: FileInfo[];
}
export declare const fileSchema: mongoose.Schema<File, mongoose.Model<File, any, any, any, mongoose.Document<unknown, any, File> & File & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, File, mongoose.Document<unknown, {}, mongoose.FlatRecord<File>> & mongoose.FlatRecord<File> & {
    _id: mongoose.Types.ObjectId;
}>;

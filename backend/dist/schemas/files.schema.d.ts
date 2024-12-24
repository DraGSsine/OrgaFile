import { Document, ObjectId } from 'mongoose';
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
export declare const fileSchema: any;

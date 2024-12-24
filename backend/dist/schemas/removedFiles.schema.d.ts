import { Document } from 'mongoose';
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
export declare const removedFilesSchema: any;

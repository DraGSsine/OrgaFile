import { Document, ObjectId } from 'mongoose';
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
export declare const folderSchema: any;

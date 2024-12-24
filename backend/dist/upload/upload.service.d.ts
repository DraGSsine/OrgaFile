import { ConfigService } from '@nestjs/config';
import { Model, ObjectId } from 'mongoose';
import { FileDocument } from '../schemas/files.schema';
import { UserDocument } from '../schemas/auth.schema';
import { RemovedFilesDocument } from '../schemas/removedFiles.schema';
import { FolderDocument } from '../schemas/folders.schema';
import { Readable } from 'stream';
export declare class UploadService {
    private readonly configService;
    private readonly removedFilesModel;
    private readonly fileModel;
    private readonly userModel;
    private readonly folderModel;
    constructor(configService: ConfigService, removedFilesModel: Model<RemovedFilesDocument>, fileModel: Model<FileDocument>, userModel: Model<UserDocument>, folderModel: Model<FolderDocument>);
    private readonly s3Client;
    uploadFiles(files: Array<Express.Multer.File>, userId: ObjectId): Promise<void>;
    restoreFile(req: any, fileId: string): Promise<import("../schemas/removedFiles.schema").FileInfo>;
    loadFiles(userId: ObjectId): Promise<import("../schemas/files.schema").FileInfo[]>;
    loadRecentFiles(userId: ObjectId): Promise<import("../schemas/files.schema").FileInfo[]>;
    loadRemovedFiles(userId: ObjectId): Promise<import("../schemas/removedFiles.schema").FileInfo[]>;
    remove(req: any, fileId: string, isPermanently: boolean): Promise<import("../schemas/files.schema").FileInfo | "File deleted permanently">;
    removeMany(req: any, fileIds: string[], isPermanently: boolean): Promise<import("../schemas/files.schema").FileInfo[] | "Files deleted permanently">;
    downloadFile(req: any, fileId: string): Promise<{
        fileStream: Readable;
        fileName: string;
        fileSize: number;
    }>;
}

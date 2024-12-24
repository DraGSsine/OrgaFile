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
    uploadFiles(files: Array<Express.Multer.File>, userId: ObjectId): unknown;
    restoreFile(req: any, fileId: string): unknown;
    loadFiles(userId: ObjectId): unknown;
    loadRecentFiles(userId: ObjectId): unknown;
    loadRemovedFiles(userId: ObjectId): unknown;
    remove(req: any, fileId: string, isPermanently: boolean): unknown;
    removeMany(req: any, fileIds: string[], isPermanently: boolean): unknown;
    downloadFile(req: any, fileId: string): Promise<{
        fileStream: Readable;
        fileName: string;
        fileSize: number;
    }>;
}

/// <reference types="multer" />
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
import { ConfigService } from '@nestjs/config';
import { Model, ObjectId } from 'mongoose';
import { FileDocument } from 'src/schemas/files.schema';
import { UserDocument } from 'src/schemas/auth.schema';
import { RemovedFilesDocument } from 'src/schemas/removedFiles.schema';
import { FolderDocument } from 'src/schemas/folders.schema';
export declare class UploadService {
    private readonly configService;
    private readonly removedFilesModel;
    private readonly fileModel;
    private readonly userModel;
    private readonly folderModel;
    constructor(configService: ConfigService, removedFilesModel: Model<RemovedFilesDocument>, fileModel: Model<FileDocument>, userModel: Model<UserDocument>, folderModel: Model<FolderDocument>);
    private readonly s3Client;
    uploadFiles(files: Array<Express.Multer.File>, userId: ObjectId): Promise<void>;
    restoreFile(req: any, fileId: string): Promise<import("src/schemas/removedFiles.schema").FileInfo>;
    loadFiles(userId: ObjectId): Promise<import("src/schemas/files.schema").FileInfo[]>;
    loadRecentFiles(userId: ObjectId): Promise<import("src/schemas/files.schema").FileInfo[]>;
    loadRemovedFiles(userId: ObjectId): Promise<import("src/schemas/removedFiles.schema").FileInfo[]>;
    remove(req: any, fileId: string, isPermanently: boolean): Promise<import("src/schemas/files.schema").FileInfo | "File deleted permanently">;
    removeMany(req: any, fileIds: string[], isPermanently: boolean): Promise<import("src/schemas/files.schema").FileInfo[] | "Files deleted permanently">;
}

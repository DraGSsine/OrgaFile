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
import { FolderDocument } from 'src/schemas/folders.schema';
import { Model } from 'mongoose';
import { FileDocument } from 'src/schemas/files.schema';
import { UserDocument } from 'src/schemas/auth.schema';
export declare class DashboardService {
    private readonly fileModel;
    private readonly userModel;
    private readonly folderModel;
    constructor(fileModel: Model<FileDocument>, userModel: Model<UserDocument>, folderModel: Model<FolderDocument>);
    cloudInfo(userId: string): Promise<{
        filesFormatInfo: {
            name: string;
            size: number;
            numberOfFiles: number;
        }[];
        storageUsed: number;
        storage: number;
    }>;
    loadUserLimits(userId: string): Promise<{
        storageLimit: number;
        storageUsed: number;
        requestLimit: number;
        requestUsed: number;
    }>;
}

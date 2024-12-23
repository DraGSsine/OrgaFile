import { FolderDocument } from '../schemas/folders.schema';
import { Model } from 'mongoose';
import { FileDocument } from '../schemas/files.schema';
import { UserDocument } from '../schemas/auth.schema';
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

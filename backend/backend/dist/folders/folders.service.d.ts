import { Model, ObjectId } from 'mongoose';
import { FolderDocument } from '../schemas/folders.schema';
import { FileInfo } from '../schemas/files.schema';
import { ConfigService } from '@nestjs/config';
export declare class FoldersService {
    private readonly configService;
    private readonly folderModel;
    constructor(configService: ConfigService, folderModel: Model<FolderDocument>);
    private readonly s3Client;
    loadFolders(userId: string): Promise<any[]>;
    loadOneFolder(folderId: ObjectId, userId: string): Promise<import("../schemas/folders.schema").FolderInfo>;
    downloadFolder(folderId: ObjectId, userId: string): Promise<any>;
    getFilesInFolder(files: FileInfo[]): Promise<{
        name: string;
        content: Buffer;
    }[]>;
    private parseS3Url;
}

import { Model, ObjectId } from 'mongoose';
import { FolderDocument } from '../schemas/folders.schema';
import { FileInfo } from '../schemas/files.schema';
import { ConfigService } from '@nestjs/config';
export declare class FoldersService {
    private readonly configService;
    private readonly folderModel;
    constructor(configService: ConfigService, folderModel: Model<FolderDocument>);
    private readonly s3Client;
    loadFolders(userId: string): unknown;
    loadOneFolder(folderId: ObjectId, userId: string): unknown;
    downloadFolder(folderId: ObjectId, userId: string): unknown;
    getFilesInFolder(files: FileInfo[]): Promise<{
        name: string;
        content: Buffer;
    }[]>;
    private parseS3Url;
}

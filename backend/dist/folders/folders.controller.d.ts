import { FoldersService } from './folders.service';
import { ObjectId } from 'mongoose';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    loadFolders(req: any): Promise<any[]>;
    loadOneFolder(id: ObjectId, req: any): Promise<import("../schemas/folders.schema").FolderInfo>;
    downloadFolder(id: ObjectId, req: any, res: any): Promise<void>;
}

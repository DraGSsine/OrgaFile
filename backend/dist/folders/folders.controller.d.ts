import { FoldersService } from './folders.service';
import { ObjectId } from 'mongoose';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    loadFolders(req: any): unknown;
    loadOneFolder(id: ObjectId, req: any): unknown;
    downloadFolder(id: ObjectId, req: any, res: any): any;
}

import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(files: Array<Express.Multer.File>, req: any): unknown;
    restoreFile(requestBody: {
        fileId: string;
    }, req: any): unknown;
    loadAllFiles(req: any): unknown;
    findRecentFiles(req: any): unknown;
    findRemovedFiles(req: any): unknown;
    remove(req: any, requestBody: {
        fileId: string;
        isPermanently: boolean;
    }): unknown;
    removeMany(req: any, requestBody: {
        files: string[];
        isPermanently: boolean;
    }): unknown;
    downloadFile(fileId: string, req: any, res: any): any;
}

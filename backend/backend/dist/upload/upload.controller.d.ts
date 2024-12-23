import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(files: Array<Express.Multer.File>, req: any): Promise<void>;
    restoreFile(requestBody: {
        fileId: string;
    }, req: any): Promise<import("../schemas/removedFiles.schema").FileInfo>;
    loadAllFiles(req: any): Promise<import("../schemas/files.schema").FileInfo[]>;
    findRecentFiles(req: any): Promise<import("../schemas/files.schema").FileInfo[]>;
    findRemovedFiles(req: any): Promise<import("../schemas/removedFiles.schema").FileInfo[]>;
    remove(req: any, requestBody: {
        fileId: string;
        isPermanently: boolean;
    }): Promise<import("../schemas/files.schema").FileInfo | "File deleted permanently">;
    removeMany(req: any, requestBody: {
        files: string[];
        isPermanently: boolean;
    }): Promise<import("../schemas/files.schema").FileInfo[] | "Files deleted permanently">;
    downloadFile(fileId: string, req: any, res: any): Promise<void>;
}

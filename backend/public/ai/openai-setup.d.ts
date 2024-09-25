/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare const analyzeDocument: (file: Express.Multer.File) => Promise<string>;
export declare const organizeFilesAnalysis: (topics: string[], categories: string[]) => Promise<any>;

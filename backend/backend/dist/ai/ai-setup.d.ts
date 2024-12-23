import { AiRespone, DocumentAiInfo } from '..//types/type';
export interface AIAnalyzeDocumnetResponse {
    mainTopic: string;
    documentType: string;
    keyEntities: string[];
    summary: string;
}
export declare const analyzeDocument: (file: Express.Multer.File) => Promise<AIAnalyzeDocumnetResponse>;
export declare const categorizeDocuments: (documents: DocumentAiInfo[], existingCategories: string[]) => Promise<AiRespone[]>;
export declare const generateFileName: (documentInfo: {
    mainTopic: string;
    documentType: string;
    keyEntities: string[];
    summary: string;
}) => Promise<string>;

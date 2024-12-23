import { Types } from 'mongoose';
import Stripe from 'stripe';
export interface AIAnalyzeDocumentResponse {
    mainTopic: string;
    documentType: string;
    keyEntities: string[];
    summary: string;
}
export interface FileInfo {
    fileId: string;
    topic: string;
    url: string;
    format: string;
    name: string;
    size: number;
    createdAt: Date;
    documentType: string;
    keyEntities: string[];
    summary: string;
}
export interface AiRespone {
    category: string;
    originalDocument: DocumentAiInfo;
}
export interface DocumentAiInfo {
    mainTopic: string;
    documentType: string;
    keyEntities: string[];
    summary: string;
}
export interface FolderInfoType {
    folderId: Types.ObjectId;
    name: string;
    files: FileInfo[];
}
export type SubscriptionHistory = {
    plan: string;
    price: number;
    currency: string;
    paymentMethod: string | Stripe.PaymentMethod;
    lastFourDigits: string;
    status: Stripe.Subscription.Status;
    startDate: number;
    endDate: number;
};

import { Document } from 'mongoose';
export type subscriptionDocument = Subscription & Document;
export declare class Subscription {
    userId: string;
    plan: 'Basic' | 'Standard' | 'Premium';
    status: 'active' | 'inactive' | 'canceled' | 'ended';
    price: number;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    subscriptionId: string;
    customerId: string;
}
export declare const subscriptionSchema: any;

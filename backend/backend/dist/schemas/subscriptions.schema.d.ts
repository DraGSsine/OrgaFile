import { Document } from 'mongoose';
export type subscriptionDocument = Subscription & Document;
export declare class Subscription {
    userId: string;
    plan: 'Basic' | 'Standard' | 'Premium';
    subscriptionStatus: 'active' | 'inactive';
    price: number;
    currentPeriodStart: Date;
    cardBrand: string;
    cardLast4: string;
    currentPeriodEnd: Date;
    subscriptionId: string;
    customerId: string;
}
export declare const subscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, Document<unknown, any, Subscription> & Subscription & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription, Document<unknown, {}, import("mongoose").FlatRecord<Subscription>> & import("mongoose").FlatRecord<Subscription> & {
    _id: import("mongoose").Types.ObjectId;
}>;

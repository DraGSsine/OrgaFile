import { RawBodyRequest } from "@nestjs/common";
import { Model } from "mongoose";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "../schemas/auth.schema";
import { subscriptionDocument } from "../schemas/subscriptions.schema";
declare const SUBSCRIPTION_PLANS: {
    readonly Basic: "price_1Q3MfoHbzmnInIZ1CsBh5rGj";
    readonly Standard: "price_1Q3Mh3HbzmnInIZ1QvC4glTC";
    readonly Premium: "price_1Q3MiPHbzmnInIZ1kdQAFHqH";
};
export declare class PaymentService {
    private subscriptionModel;
    private userModel;
    private jwtService;
    private stripe;
    private redirectUrl;
    constructor(subscriptionModel: Model<subscriptionDocument>, userModel: Model<UserDocument>, jwtService: JwtService);
    handleWebhook(request: RawBodyRequest<Request>, response: Response): Promise<void>;
    private handlePaymentSucceeded;
    private handlePaymentFailed;
    private handleSubscriptionEnded;
    createChekoutSession(plan: keyof typeof SUBSCRIPTION_PLANS, userId: string): Promise<{
        url: string;
        error?: undefined;
    } | {
        error: string;
        url?: undefined;
    }>;
    checkSubscription(userId: string): Promise<{
        isSubscribed: boolean;
        newToken: string;
    }>;
    cancelSubscription(userId: string): Promise<{
        error: string;
        message?: undefined;
    } | {
        message: string;
        error?: undefined;
    }>;
    renewSubscription(userId: string): Promise<void>;
    private findOrCreateCustomer;
    private hasActiveSubscription;
    private getActiveSubscription;
    private getCanceledSubscription;
    private isSubscriptionExpired;
    private generateSubscriptionToken;
}
export {};

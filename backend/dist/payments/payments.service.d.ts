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
    handleWebhook(request: RawBodyRequest<Request>, response: Response): any;
    private handlePaymentSucceeded;
    private handlePaymentFailed;
    private handleSubscriptionEnded;
    private handleSubscriptionUpdated;
    createChekoutSession(plan: keyof typeof SUBSCRIPTION_PLANS, userId: string): unknown;
    checkSubscription(userId: string): unknown;
    cancelSubscription(userId: string): unknown;
    renewSubscription(userId: string): unknown;
    mangeStripePortal(userId: string): unknown;
    private findOrCreateCustomer;
    private getCanceledSubscription;
    private generateSubscriptionToken;
}
export {};

import { RawBodyRequest } from '@nestjs/common';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserDocument } from '../schemas/auth.schema';
import { subscriptionDocument } from '../schemas/subscriptions.schema';
import { JwtService } from '@nestjs/jwt';
export declare class PaymentService {
    private readonly subscriptionModel;
    private readonly userModel;
    private jwtService;
    private stripeClient;
    constructor(subscriptionModel: Model<subscriptionDocument>, userModel: Model<UserDocument>, jwtService: JwtService);
    checkSubscription(userId: string): Promise<{
        isSubscribed: boolean;
        newToken: string;
    }>;
    private findOrCreateCustomer;
    createCheckoutSession(createPaymentDto: CreatePaymentDto, userId: string): Promise<{
        error: string;
        url?: undefined;
    } | {
        url: string;
        error?: undefined;
    }>;
    handleWebhook(request: RawBodyRequest<Request>, response: Response): Promise<void>;
    private handleSubscriptionCreated;
    private handleSubscriptionUpdated;
    private handleSubscriptionDeleted;
    private handlePaymentFailed;
    createNewSubscription(subscription: Stripe.Subscription, userId: string): Promise<void>;
    cancelSubscription(userId: string): Promise<{
        error: string;
        url?: undefined;
    } | {
        url: string;
        error?: undefined;
    }>;
}

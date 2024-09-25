/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { RawBodyRequest } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserDocument } from 'src/schemas/auth.schema';
import { subscriptionDocument } from 'src/schemas/subscriptions.schema';
export declare class PaymentService {
    private readonly subscriptionModel;
    private readonly userModel;
    private stripeClient;
    constructor(subscriptionModel: Model<subscriptionDocument>, userModel: Model<UserDocument>);
    createCheckoutSession(createPaymentDto: CreatePaymentDto, userId: string): Promise<{
        url: string;
    }>;
    handleWebhook(request: RawBodyRequest<Request>, response: Response): Promise<void>;
    private handleCheckoutSession;
    private handleInvoicePaymentSucceeded;
    private setPlanByItsId;
    private setStorageBaseOnPlan;
}

import { RawBodyRequest } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    private resHeaders;
    createSession(createPaymentDto: CreatePaymentDto, request: any, response: Response): unknown;
    webhook(request: RawBodyRequest<Request>, response: Response): unknown;
    manageBilling(request: any, res: Response): unknown;
    cancelSubscription(request: any, res: Response): unknown;
    renewSubscription(request: any, res: Response): unknown;
    checkSubscription(request: any, res: Response): unknown;
}

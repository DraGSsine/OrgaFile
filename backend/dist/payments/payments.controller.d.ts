import { RawBodyRequest } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    private resHeaders;
    createSession(createPaymentDto: CreatePaymentDto, request: any, response: Response): Promise<Response<any, Record<string, any>>>;
    webhook(request: RawBodyRequest<Request>, response: Response): Promise<void>;
    manageBilling(request: any, res: Response): Promise<Response<any, Record<string, any>>>;
    checkSubscription(request: any, res: Response): Promise<Response<any, Record<string, any>>>;
}

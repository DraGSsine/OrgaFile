import { RawBodyRequest } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createSession(createPaymentDto: CreatePaymentDto, request: any): Promise<{
        url: string;
    }>;
    webhook(request: RawBodyRequest<Request>, response: Response): Promise<void>;
}

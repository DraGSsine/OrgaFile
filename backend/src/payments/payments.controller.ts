// src/payment/payment.controller.ts

import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  async createSession(@Body() createPaymentDto: CreatePaymentDto){
    const result = await this.paymentService.createCheckoutSession(createPaymentDto);
    return result;
  }

  @Post('webhook')
  async webhook(@Req() request: Request, @Res() response: Response) {
    return this.paymentService.handleWebhook(request, response);
  }
}

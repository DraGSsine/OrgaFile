// src/payment/payment.controller.ts

import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  RawBodyRequest,
  Get,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CookieOptions, Request, Response } from 'express';
import { PaymentService } from './payments.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private resHeaders: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    domain: 'localhost',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  async createSession(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: any,
  ) {
    const result = await this.paymentService.createCheckoutSession(
      createPaymentDto,
      request.user.userId,
    );
    return result;
  }
  @Post('webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
  ) {
    return this.paymentService.handleWebhook(request, response);
  }
  @Get('check-subscription')
  @UseGuards(AuthGuard)
  async checkSubscription(@Req() request: any, @Res() res: Response) {
    const { newToken } = await this.paymentService.checkSubscription(
      request.user.userId,
    );
    res.cookie('token', newToken, this.resHeaders);
    res.send({
      message: 'Subscription checked',
    });
  }
}

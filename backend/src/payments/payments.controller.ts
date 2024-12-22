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
    domain: process.env.PROD === 'true' ? '.orgafile.com' : 'localhost',
    sameSite: process.env.PROD === 'true' ? 'none' : 'lax',
    secure: process.env.PROD === 'true' ? true : false,
    httpOnly: true,
  };
  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  async createSession(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: any,
    @Res() response: Response,
  ) {
    try {
      const result = await this.paymentService.createCheckoutSession(
        createPaymentDto,
        request.user.userId,
      );
      console.log('Checkout session result:', result); 
      return response.send(result);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return response.status(500).send({ error: 'Internal Server Error' });
    }
  }
  @Post('webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
  ) {
    return this.paymentService.handleWebhook(request, response);
  }

  @Post('manage-billing')
  @UseGuards(AuthGuard)
  async manageBilling(@Req() request: any, @Res() res: Response) {
    const result = await this.paymentService.cancelSubscription(
      request.user.userId,
    );
    return res.send(result);
  }

  @Get('check-subscription')
  @UseGuards(AuthGuard)
  async checkSubscription(@Req() request: any, @Res() res: Response) {
    const { newToken,isSubscribed } = await this.paymentService.checkSubscription(
      request.user.userId,
    );
    if (!isSubscribed){
      res.clearCookie('token');
      return res.status(400).send({
        message: 'Subscription not found',
      });
    }
    res.cookie('token', newToken, this.resHeaders);
    res.send({
      message: 'Subscription checked',
    });
  }
}

import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  RawBodyRequest,
  Get,
  BadRequestException,
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
      const result = await this.paymentService.createChekoutSession(
        createPaymentDto.plan,
        request.user.userId,
      );
      return response.send(result);
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new BadRequestException(error.message);
    }
  }
  @Post('webhook')
  async webhook(
    @Req() request: RawBodyRequest<Request>,
    @Res() response: Response,
  ) {
    return this.paymentService.handleWebhook(request, response);
  }

  @Get('manage-billing')
  @UseGuards(AuthGuard)
  async manageBilling(@Req() request: any, @Res() res: Response) {
    const result = await this.paymentService.mangeStripePortal(
      request.user.userId,
    );
    return res.send(result);
  }

  @Post('cancel-subscription')
  @UseGuards(AuthGuard)
  async cancelSubscription(@Req() request: any, @Res() res: Response) {
    const result = await this.paymentService.cancelSubscription(
      request.user.userId,
    );
    return res.send(result);
  }

  @Post('renew-subscription')
  @UseGuards(AuthGuard)
  async renewSubscription(@Req() request: any, @Res() res: Response) {
    const result = await this.paymentService.renewSubscription(
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

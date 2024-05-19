import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService ) {}

  @Post('stripe')
  async pay(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.pay(createPaymentDto);
  }

  @Post('webhook')
  async createOrder(@Body() body: any) {
    return this.paymentsService.createOrder(body);
  }
}

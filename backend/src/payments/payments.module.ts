import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payments.controller';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { subscriptionSchema } from '../schemas/subscriptions.schema';
import { userSchema } from '../schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: subscriptionSchema },
      { name: 'User', schema: userSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, AuthGuard, JwtService],
})
export class PaymentsModule {}

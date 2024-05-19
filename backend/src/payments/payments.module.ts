import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/auth.schema';
import { PaymentController } from './payments.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentsModule {}

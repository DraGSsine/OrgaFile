import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/auth.schema';
import { PaymentController } from './payments.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService,AuthGuard,JwtService],
})
export class PaymentsModule {}

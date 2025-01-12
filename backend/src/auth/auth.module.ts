import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { subscriptionSchema } from '../schemas/subscriptions.schema';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'Subscription', schema: subscriptionSchema },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService,GoogleStrategy],
})
export class AuthModule {}

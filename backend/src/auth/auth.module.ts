import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
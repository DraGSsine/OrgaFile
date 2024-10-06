import { signInDto, signUpDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/auth.schema';
import { Injectable, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { subscriptionDocument } from '../schemas/subscriptions.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('Subscription')
    private readonly subscriptionModel: Model<subscriptionDocument>,
  ) {}

  async signIn(signInDto: signInDto) {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException('Email or password is incorrect');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException('Email or password is incorrect');
    }
    const isSubscribed = await this.subscriptionModel.findOne({ userId: user._id });
    const tokens = await this.generateTokens(user._id, !!isSubscribed);
    return {
      ...tokens,
      user: {
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  async signUp(signUpDto: signUpDto) {
    const { email, password } = signUpDto;
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new UnprocessableEntityException('User already exists');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      ...signUpDto,
      password: encryptedPassword,
    });
    return { message: 'User created successfully', userId: newUser._id };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });
      const user = await this.userModel.findById(payload.userId);
      if (!user) {
        throw new UnprocessableEntityException('User not found');
      }
      const isSubscribed = await this.subscriptionModel.findOne({ userId: user._id });
      const tokens = await this.generateTokens(user._id, !!isSubscribed);
      return {
        ...tokens,
        user: {
          email: user.email,
          fullName: user.fullName,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: string, isSubscribed: boolean) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, isSubscribed },
        { expiresIn: '15m', secret: process.env.JWT_SECRET_KEY },
      ),
      this.jwtService.signAsync(
        { userId },
        { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET_KEY },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
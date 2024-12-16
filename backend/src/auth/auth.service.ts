import { signInDto, signUpDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/auth.schema';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    const isSubscribed = await this.subscriptionModel.findOne({
      userId: user._id,
    });
    const token = await this.generateTokens(user._id, !!isSubscribed);
    return {
      token,
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
    const token = await this.generateTokens(newUser._id, false);
    return {
      token,
      user: { email: newUser.email, fullName: newUser.fullName },
    };
  }

  private async generateTokens(userId: string, isSubscribed: boolean) {
    const accessToken = await this.jwtService.signAsync(
      { userId, isSubscribed },
      { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
    );

    return accessToken;
  }
}

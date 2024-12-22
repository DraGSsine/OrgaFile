import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '..//schemas/auth.schema';
import * as bcrypt from 'bcrypt';
import { SubscriptionHistory } from '..//types/type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('folder') private readonly folderModel: Model<any>,
    @InjectModel('file') private readonly fileModel: Model<any>,
    @InjectModel('subscription') private readonly subscriptionModel: Model<any>,
    @InjectModel('removedFile') private readonly removedFileModel: Model<any>,
  ) { }

  async updateProfile(createUserDto: CreateUserDto, userId: string) {
    const { firstName, lastName } = createUserDto;
    const fullName = `${firstName} ${lastName}`;
    try {
      await this.userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { firstName, fullName },
      );
    } catch (error) {
      return error;
    }
    return { fullName };
  }

  async updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string) {
    const { currentPassword, newPassword, confirmPassword } = updatePassowrdDto;
    if (newPassword !== confirmPassword) {
      throw new UnprocessableEntityException(['Password does not match']);
    }
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new UnprocessableEntityException(['User not found']);
    }
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException(['current password is incorrect']);
    }
    try {
      const encryptedPassword = await bcrypt.hash(confirmPassword, 10);
      await this.userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { password: encryptedPassword },
      );
    } catch (error) {
      throw error;
    }
    return 'Password updated successfully';
  }

  async remove(userId: string) {
    try {
      await this.userModel.findOneAndDelete({ _id: userId });
      await this.folderModel.deleteMany({ userId });
      await this.fileModel.deleteMany({ userId });
      await this.subscriptionModel.deleteMany({ userId });
      await this.removedFileModel.deleteMany({ userId });
      return 'User account deleted successfully';
    } catch (error) {
      return error;
    }
  }

  async getUserInfo(userId: string) {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      // get the latest subscription
      const subscription = await this.subscriptionModel.findOne({ userId }).sort({ createdAt: -1 });
      // get all the subscription history
      const subscriptionHistory = await this.subscriptionModel.find({ userId });
      const response = {
        plan: subscription.plan,
        fullName: user.fullName,
        email: user.email,
        subscriptionEnds:subscription.currentPeriodEnd,
        price: subscription.price,
        subscriptionHistory: subscriptionHistory.map((sub: SubscriptionHistory) => ({
          plan: sub.plan,
          createdAt: sub.currentPeriodStart,
          price: sub.price,
        })),
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async hasSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({ userId, subscriptionStatus: 'active' });
    return !!subscription;
  }

}

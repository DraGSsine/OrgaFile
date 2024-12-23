import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "..//schemas/auth.schema";
import * as bcrypt from "bcrypt";
import { SubscriptionHistory } from "..//types/type";
import Stripe from "stripe";

@Injectable()
export class UserService {
  private stripeClient: Stripe;
  constructor(
    @InjectModel("user") private readonly userModel: Model<UserDocument>,
    @InjectModel("folder") private readonly folderModel: Model<any>,
    @InjectModel("file") private readonly fileModel: Model<any>,
    @InjectModel("subscription") private readonly subscriptionModel: Model<any>,
    @InjectModel("removedFile") private readonly removedFileModel: Model<any>
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-04-10",
    });
  }

  async updateProfile(createUserDto: CreateUserDto, userId: string) {
    const { firstName, lastName } = createUserDto;
    const fullName = `${firstName} ${lastName}`;
    try {
      await this.userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { firstName, fullName }
      );
    } catch (error) {
      return error;
    }
    return { fullName };
  }

  async updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string) {
    const { currentPassword, newPassword, confirmPassword } = updatePassowrdDto;
    if (newPassword !== confirmPassword) {
      throw new UnprocessableEntityException(["Password does not match"]);
    }
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new UnprocessableEntityException(["User not found"]);
    }
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException(["current password is incorrect"]);
    }
    try {
      const encryptedPassword = await bcrypt.hash(confirmPassword, 10);
      await this.userModel.findOneAndUpdate(
        {
          _id: userId,
        },
        { password: encryptedPassword }
      );
    } catch (error) {
      throw error;
    }
    return "Password updated successfully";
  }

  async remove(userId: string) {
    try {
      await this.userModel.findOneAndDelete({ _id: userId });
      await this.folderModel.deleteMany({ userId });
      await this.fileModel.deleteMany({ userId });
      await this.subscriptionModel.deleteMany({ userId });
      await this.removedFileModel.deleteMany({ userId });
      return "User account deleted successfully";
    } catch (error) {
      return error;
    }
  }

  formatPaymentHistory(payments, invoices,subscriptiondb, user ,paymentMethod) {
    const latestInvoice = invoices.data[0];
    const subscription = latestInvoice.lines.data[0];
    const lastFourDigits = paymentMethod.data[0].card.last4;
    const cardBrand = paymentMethod.data[0].card.brand;
    return {
      plan: subscriptiondb.plan,
      fullName: user.fullName,
      email: user.email,
      subscriptionEnds: new Date(latestInvoice.lines.data[0].period.end * 1000),
      price: subscription.plan.amount / 100,
      status: subscriptiondb.status,
      currency: latestInvoice.currency,
      lastFourDigits: lastFourDigits,
      cardBrand: cardBrand,
      subscriptionHistory: invoices.data.map((invoice) => ({
        plan: invoice.lines.data[0].description
          .split("×")[1]
          .trim()
          .split("(")[0]
          .trim(),
        price: invoice.amount_due / 100,
        currency: invoice.currency,
        paymentMethod: payments.data[0].payment_method_types[0],
        lastFourDigits: lastFourDigits,
        status: invoice.status,
        startDate: new Date(invoice.lines.data[0].period.start * 1000),
        endDate: new Date(invoice.lines.data[0].period.end * 1000),
      })),
    };
  }

  async getUserInfo(userId: string) {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      // get the latest subscription
      const subscription = await this.subscriptionModel
        .findOne({ userId })
        .sort({ createdAt: -1 });
      const customerId = subscription.customerId;
      /////////////////////////////

      // Get all payments
      const payments = await this.stripeClient.paymentIntents.list({
        customer: customerId,
        limit: 100,
      });

      // Get subscription invoices
      const invoices = await this.stripeClient.invoices.list({
        customer: customerId,
        limit: 100,
      });
      // return customerId
      const paymentMethod = await this.stripeClient.customers.listPaymentMethods(
        customerId
      );
      return this.formatPaymentHistory( payments, invoices,subscription , user ,paymentMethod );
      ////////////////////////////
    } catch (error) {
      throw new UnprocessableEntityException(["User not found"]);
    }
  }

  async hasSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({
      userId,
      status: "active",
    });
    if (!subscription) {
      return false;
    }
    return true;
  }
}

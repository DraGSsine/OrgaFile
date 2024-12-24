import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "..//schemas/auth.schema";
import * as bcrypt from "bcrypt";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class UserService {
  private stripeClient: Stripe;
  private readonly s3Client = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.get("S3_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("S3_SECRET_ACCESS_KEY"),
    },
    region: this.configService.get("S3_REGION"),
  });
  constructor(
    private readonly configService: ConfigService,
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
    const { currentPassword, newPassword } = updatePassowrdDto;
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
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
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
      const user = await this.userModel.findOne({ _id: userId });
      if (!user) {
        throw new UnprocessableEntityException(["User not found"]);
      }

      const userFiles = await this.fileModel.findOne({ userId });

      // Get all the file ids of the user
      const fileIds = userFiles.files.map((file) => file.fileId);

      if (fileIds.length > 0) {
        // Remove the user objects from S3
        const deleteParams = {
          Bucket: this.configService.get("S3_BUCKET_NAME"),
          Delete: {
            Objects: fileIds.map((fileId) => ({
              Key: `${userId}/${fileId}`,
            })),
          },
        };
        await this.s3Client.deleteObjects(deleteParams).promise();
      }
      // Remove the user data from the database
      await this.userModel.findOneAndDelete({ _id: userId });
      await this.folderModel.deleteMany({ userId });
      await this.fileModel.deleteMany({ userId });
      await this.subscriptionModel.deleteMany({ userId });
      await this.removedFileModel.deleteMany({ userId });

      return "User account deleted successfully";
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  /*


    */
  async formatPaymentHistory(
    payments,
    invoices,
    subscriptiondb,
    user,
    stripeSubscription
  ) {
    const latestInvoice = invoices.data[0];
    const subscription = latestInvoice.lines.data[0];

    // Get the current payment method from the subscription's default_payment_method
    const currentPaymentMethod = stripeSubscription.default_payment_method;

    return {
      plan: subscriptiondb.plan,
      fullName: user.fullName,
      email: user.email,
      subscriptionEnds: new Date(subscription.period.end * 1000).toISOString(),
      price: subscription.plan.amount / 100,
      status: subscriptiondb.status,
      currency: latestInvoice.currency,
      lastFourDigits: currentPaymentMethod?.card?.last4 || "",
      cardBrand: currentPaymentMethod?.card?.brand || "",
      subscriptionHistory: await Promise.all(
        invoices.data.map(async (invoice) => {
          // Fetch the payment intent with expanded payment method for each invoice
          let paymentMethodDetails = null;
          if (invoice.payment_intent) {
            try {
              const paymentIntent =
                await this.stripeClient.paymentIntents.retrieve(
                  typeof invoice.payment_intent === "string"
                    ? invoice.payment_intent
                    : invoice.payment_intent.id,
                  {
                    expand: ["payment_method"],
                  }
                );
              paymentMethodDetails = paymentIntent.payment_method;
            } catch (error) {
              console.error(
                `Error fetching payment intent details: ${error.message}`
              );
            }
          }

          return {
            plan: invoice.lines.data[0].description
              .split("×")[1]
              ?.trim()
              ?.split("(")[0]
              ?.trim(),
            price: invoice.amount_due / 100,
            currency: invoice.currency,
            paymentMethod: paymentMethodDetails?.type || "",
            lastFourDigits: paymentMethodDetails?.card?.last4 || "",
            cardBrand: paymentMethodDetails?.card?.brand || "",
            status: invoice.status,
            startDate: new Date(
              invoice.lines.data[0].period.start * 1000
            ).toISOString(),
            endDate: new Date(
              invoice.lines.data[0].period.end * 1000
            ).toISOString(),
          };
        })
      ),
    };
  }

  async getUserInfo(userId) {
    try {
      // Get user and latest subscription
      const user = await this.userModel.findOne({ _id: userId });
      if (!user) {
        throw new UnprocessableEntityException(["User not found"]);
      }

      const subscription = await this.subscriptionModel
        .findOne({ userId })
        .sort({ createdAt: -1 });

      if (!subscription) {
        throw new UnprocessableEntityException(["No subscription found"]);
      }

      const customerId = subscription.customerId;

      // Fetch all required data in parallel
      const [payments, invoices, stripeSubscription] = await Promise.all([
        this.stripeClient.paymentIntents.list({
          customer: customerId,
          limit: 100,
          expand: ["data.payment_method"],
        }),
        this.stripeClient.invoices.list({
          customer: customerId,
          limit: 100,
          expand: ["data.payment_intent"],
        }),
        this.stripeClient.subscriptions.retrieve(subscription.subscriptionId, {
          expand: [
            "customer",
            "default_payment_method",
            "latest_invoice",
            "latest_invoice.payment_intent",
            "plan",
          ],
        }),
      ]);

      // Format and return the payment history
      return await this.formatPaymentHistory(
        payments,
        invoices,
        subscription,
        user,
        stripeSubscription
      );
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      throw new UnprocessableEntityException(["User not found"]);
    }
  }

  async hasSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({
      userId,
      status: { $in: ["active", "canceled"] },
    });
    if (!subscription) {
      return false;
    }
    return true;
  }
}

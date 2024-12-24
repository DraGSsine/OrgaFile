"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
let UserService = class UserService {
    constructor(configService, userModel, folderModel, fileModel, subscriptionModel, removedFileModel) {
        this.configService = configService;
        this.userModel = userModel;
        this.folderModel = folderModel;
        this.fileModel = fileModel;
        this.subscriptionModel = subscriptionModel;
        this.removedFileModel = removedFileModel;
        this.s3Client = new AWS.S3({
            credentials: {
                accessKeyId: this.configService.get("S3_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get("S3_SECRET_ACCESS_KEY"),
            },
            region: this.configService.get("S3_REGION"),
        });
        this.stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2024-04-10",
        });
    }
    async updateProfile(createUserDto, userId) {
        const { firstName, lastName } = createUserDto;
        const fullName = `${firstName} ${lastName}`;
        try {
            await this.userModel.findOneAndUpdate({
                _id: userId,
            }, { firstName, fullName });
        }
        catch (error) {
            return error;
        }
        return { fullName };
    }
    async updatePassword(updatePassowrdDto, userId) {
        const { currentPassword, newPassword } = updatePassowrdDto;
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.UnprocessableEntityException(["User not found"]);
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnprocessableEntityException(["current password is incorrect"]);
        }
        try {
            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            await this.userModel.findOneAndUpdate({
                _id: userId,
            }, { password: encryptedPassword });
        }
        catch (error) {
            throw error;
        }
        return "Password updated successfully";
    }
    async remove(userId) {
        try {
            const user = await this.fileModel.findOne({ userId });
            if (!user) {
                throw new common_1.UnprocessableEntityException(["User not found"]);
            }
            const fileIds = user.files.map((file) => file.fileId);
            const deleteParams = {
                Bucket: this.configService.get("S3_BUCKET_NAME"),
                Delete: {
                    Objects: fileIds.map((fileId) => ({
                        Key: `${userId}/${fileId}`,
                    })),
                },
            };
            await this.s3Client.deleteObjects(deleteParams).promise();
            await this.userModel.findOneAndDelete({ _id: userId });
            await this.folderModel.deleteMany({ userId });
            await this.fileModel.deleteMany({ userId });
            await this.subscriptionModel.deleteMany({ userId });
            await this.removedFileModel.deleteMany({ userId });
            return "User account deleted successfully";
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
    async formatPaymentHistory(payments, invoices, subscriptiondb, user, stripeSubscription) {
        const latestInvoice = invoices.data[0];
        const subscription = latestInvoice.lines.data[0];
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
            subscriptionHistory: await Promise.all(invoices.data.map(async (invoice) => {
                let paymentMethodDetails = null;
                if (invoice.payment_intent) {
                    try {
                        const paymentIntent = await this.stripeClient.paymentIntents.retrieve(typeof invoice.payment_intent === "string"
                            ? invoice.payment_intent
                            : invoice.payment_intent.id, {
                            expand: ["payment_method"],
                        });
                        paymentMethodDetails = paymentIntent.payment_method;
                    }
                    catch (error) {
                        console.error(`Error fetching payment intent details: ${error.message}`);
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
                    startDate: new Date(invoice.lines.data[0].period.start * 1000).toISOString(),
                    endDate: new Date(invoice.lines.data[0].period.end * 1000).toISOString(),
                };
            })),
        };
    }
    async getUserInfo(userId) {
        try {
            const user = await this.userModel.findOne({ _id: userId });
            if (!user) {
                throw new common_1.UnprocessableEntityException(["User not found"]);
            }
            const subscription = await this.subscriptionModel
                .findOne({ userId })
                .sort({ createdAt: -1 });
            if (!subscription) {
                throw new common_1.UnprocessableEntityException(["No subscription found"]);
            }
            const customerId = subscription.customerId;
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
            return await this.formatPaymentHistory(payments, invoices, subscription, user, stripeSubscription);
        }
        catch (error) {
            console.error("Error in getUserInfo:", error);
            throw new common_1.UnprocessableEntityException(["User not found"]);
        }
    }
    async hasSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({
            userId,
            status: { $in: ["active", "canceled"] },
        });
        if (!subscription) {
            return false;
        }
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)("user")),
    __param(2, (0, mongoose_1.InjectModel)("folder")),
    __param(3, (0, mongoose_1.InjectModel)("file")),
    __param(4, (0, mongoose_1.InjectModel)("subscription")),
    __param(5, (0, mongoose_1.InjectModel)("removedFile")),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
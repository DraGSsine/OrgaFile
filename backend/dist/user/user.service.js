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
let UserService = class UserService {
    constructor(userModel, folderModel, fileModel, subscriptionModel, removedFileModel) {
        this.userModel = userModel;
        this.folderModel = folderModel;
        this.fileModel = fileModel;
        this.subscriptionModel = subscriptionModel;
        this.removedFileModel = removedFileModel;
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
        const { currentPassword, newPassword, confirmPassword } = updatePassowrdDto;
        if (newPassword !== confirmPassword) {
            throw new common_1.UnprocessableEntityException(["Password does not match"]);
        }
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.UnprocessableEntityException(["User not found"]);
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnprocessableEntityException(["current password is incorrect"]);
        }
        try {
            const encryptedPassword = await bcrypt.hash(confirmPassword, 10);
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
            await this.userModel.findOneAndDelete({ _id: userId });
            await this.folderModel.deleteMany({ userId });
            await this.fileModel.deleteMany({ userId });
            await this.subscriptionModel.deleteMany({ userId });
            await this.removedFileModel.deleteMany({ userId });
            return "User account deleted successfully";
        }
        catch (error) {
            return error;
        }
    }
    formatPaymentHistory(payments, invoices, subscriptiondb, user, paymentMethod) {
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
    async getUserInfo(userId) {
        try {
            const user = await this.userModel.findOne({ _id: userId });
            const subscription = await this.subscriptionModel
                .findOne({ userId })
                .sort({ createdAt: -1 });
            const customerId = subscription.customerId;
            const payments = await this.stripeClient.paymentIntents.list({
                customer: customerId,
                limit: 100,
            });
            const invoices = await this.stripeClient.invoices.list({
                customer: customerId,
                limit: 100,
            });
            const paymentMethod = await this.stripeClient.customers.listPaymentMethods(customerId);
            return this.formatPaymentHistory(payments, invoices, subscription, user, paymentMethod);
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException(["User not found"]);
        }
    }
    async hasSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({
            userId,
            status: "active",
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
    __param(0, (0, mongoose_1.InjectModel)("user")),
    __param(1, (0, mongoose_1.InjectModel)("folder")),
    __param(2, (0, mongoose_1.InjectModel)("file")),
    __param(3, (0, mongoose_1.InjectModel)("subscription")),
    __param(4, (0, mongoose_1.InjectModel)("removedFile")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
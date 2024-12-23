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
let UserService = class UserService {
    constructor(userModel, folderModel, fileModel, subscriptionModel, removedFileModel) {
        this.userModel = userModel;
        this.folderModel = folderModel;
        this.fileModel = fileModel;
        this.subscriptionModel = subscriptionModel;
        this.removedFileModel = removedFileModel;
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
            throw new common_1.UnprocessableEntityException(['Password does not match']);
        }
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.UnprocessableEntityException(['User not found']);
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnprocessableEntityException(['current password is incorrect']);
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
        return 'Password updated successfully';
    }
    async remove(userId) {
        try {
            await this.userModel.findOneAndDelete({ _id: userId });
            await this.folderModel.deleteMany({ userId });
            await this.fileModel.deleteMany({ userId });
            await this.subscriptionModel.deleteMany({ userId });
            await this.removedFileModel.deleteMany({ userId });
            return 'User account deleted successfully';
        }
        catch (error) {
            return error;
        }
    }
    async getUserInfo(userId) {
        try {
            const user = await this.userModel.findOne({ _id: userId });
            const subscription = await this.subscriptionModel.findOne({ userId }).sort({ createdAt: -1 });
            const subscriptionHistory = await this.subscriptionModel.find({ userId });
            const response = {
                plan: subscription.plan,
                fullName: user.fullName,
                email: user.email,
                subscriptionEnds: subscription.currentPeriodEnd,
                price: subscription.price,
                subscriptionHistory: subscriptionHistory.map((sub) => ({
                    plan: sub.plan,
                    price: sub.price,
                    currency: 'usd',
                    paymentMethod: sub.cardBrand,
                    lastFourDigits: sub.cardLast4,
                    status: sub.subscriptionStatus,
                    createdAt: sub.currentPeriodStart,
                })),
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async hasSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({ userId, subscriptionStatus: 'active' });
        if (!subscription) {
            return false;
        }
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __param(1, (0, mongoose_1.InjectModel)('folder')),
    __param(2, (0, mongoose_1.InjectModel)('file')),
    __param(3, (0, mongoose_1.InjectModel)('subscription')),
    __param(4, (0, mongoose_1.InjectModel)('removedFile')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, userModel, subscriptionModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.subscriptionModel = subscriptionModel;
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userModel.findOne({
            email: email,
        });
        if (!user)
            throw new common_1.UnprocessableEntityException('Email or password is incorrect');
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw new common_1.UnprocessableEntityException('Email or password is incorrect');
        const token = await this.jwtService.signAsync({ userId: user._id }, { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY });
        const refreshToken = await this.jwtService.signAsync({ userId: user._id }, { expiresIn: '7d', secret: process.env.REFRESH_TOKEN });
        const isSubscribed = await this.subscriptionModel.findOne({
            userId: user._id,
        });
        return { token, isSubscribed: isSubscribed ? true : false, userInfo: { email: user.email, fullName: user.fullName } };
    }
    async signUp(signUpDto) {
        const { email, password } = signUpDto;
        const userExists = await this.userModel.findOne({
            email: email,
        });
        if (userExists) {
            throw new common_1.UnprocessableEntityException('User already exists');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        this.userModel.create({
            ...signUpDto,
            password: encryptedPassword,
        });
        return { message: 'User created successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('user')),
    __param(2, (0, mongoose_2.InjectModel)('Subscription')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model,
        mongoose_1.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map
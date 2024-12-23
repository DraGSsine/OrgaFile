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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const payments_service_1 = require("./payments.service");
const auth_guard_1 = require("../guards/auth.guard");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.resHeaders = {
            domain: process.env.PROD === 'true' ? '.orgafile.com' : 'localhost',
            sameSite: process.env.PROD === 'true' ? 'none' : 'lax',
            secure: process.env.PROD === 'true' ? true : false,
            httpOnly: true,
        };
    }
    async createSession(createPaymentDto, request, response) {
        try {
            const result = await this.paymentService.createCheckoutSession(createPaymentDto, request.user.userId);
            console.log('Checkout session result:', result);
            return response.send(result);
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            return response.status(500).send({ error: 'Internal Server Error' });
        }
    }
    async webhook(request, response) {
        return this.paymentService.handleWebhook(request, response);
    }
    async cancelSubscription(request, res) {
        const result = await this.paymentService.cancelSubscription(request.user.userId);
        return res.send(result);
    }
    async renewSubscription(request, res) {
        const result = await this.paymentService.renewSubscription(request.user.userId);
        return res.send(result);
    }
    async manageBilling(request, res) {
        const result = await this.paymentService.manageBilling(request.user.userId);
        return res.send(result);
    }
    async checkSubscription(request, res) {
        const { newToken, isSubscribed } = await this.paymentService.checkSubscription(request.user.userId);
        if (!isSubscribed) {
            res.clearCookie('token');
            return res.status(400).send({
                message: 'Subscription not found',
            });
        }
        res.cookie('token', newToken, this.resHeaders);
        res.send({
            message: 'Subscription checked',
        });
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create-checkout-session'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createSession", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "webhook", null);
__decorate([
    (0, common_1.Post)('cancel-subscription'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Post)('renew-subscription'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "renewSubscription", null);
__decorate([
    (0, common_1.Get)('manage-billing'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "manageBilling", null);
__decorate([
    (0, common_1.Get)('check-subscription'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkSubscription", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('api/payment'),
    __metadata("design:paramtypes", [payments_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payments.controller.js.map
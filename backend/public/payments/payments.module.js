"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const mongoose_1 = require("@nestjs/mongoose");
const payments_controller_1 = require("./payments.controller");
const auth_guard_1 = require("../guards/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const subscriptions_schema_1 = require("../schemas/subscriptions.schema");
const auth_schema_1 = require("../schemas/auth.schema");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Subscription', schema: subscriptions_schema_1.subscriptionSchema },
                { name: 'User', schema: auth_schema_1.userSchema },
            ]),
        ],
        controllers: [payments_controller_1.PaymentController],
        providers: [payments_service_1.PaymentService, auth_guard_1.AuthGuard, jwt_1.JwtService],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map
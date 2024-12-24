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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionSchema = exports.Subscription = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Subscription = class Subscription {
};
exports.Subscription = Subscription;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, mongoose_1.Prop)({ enum: ['Basic', 'Standard', 'Premium'] }),
    __metadata("design:type", String)
], Subscription.prototype, "plan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'inactive',
        enum: ['active', 'inactive', 'canceled', 'ended']
    }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Subscription.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Subscription.prototype, "currentPeriodStart", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Subscription.prototype, "currentPeriodEnd", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Subscription.prototype, "subscriptionId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Subscription.prototype, "customerId", void 0);
exports.Subscription = Subscription = __decorate([
    (0, mongoose_1.Schema)()
], Subscription);
exports.subscriptionSchema = mongoose_1.SchemaFactory.createForClass(Subscription);
//# sourceMappingURL=subscriptions.schema.js.map
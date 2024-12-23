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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stripe_1 = require("stripe");
const jwt_1 = require("@nestjs/jwt");
const SUBSCRIPTION_PLANS = {
    Basic: "price_1Q3MfoHbzmnInIZ1CsBh5rGj",
    Standard: "price_1Q3Mh3HbzmnInIZ1QvC4glTC",
    Premium: "price_1Q3MiPHbzmnInIZ1kdQAFHqH",
};
const PLAN_LIMITS = {
    Basic: { storage: 5, requestLimit: 100 },
    Standard: { storage: 15, requestLimit: 400 },
    Premium: { storage: 20, requestLimit: 500 },
};
let PaymentService = class PaymentService {
    constructor(subscriptionModel, userModel, jwtService) {
        this.subscriptionModel = subscriptionModel;
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2024-04-10",
        });
        this.redirectUrl =
            process.env.PROD === "true"
                ? process.env.NEXT_APP_URL_PROD
                : process.env.NEXT_APP_URL_DEV;
    }
    async handleWebhook(request, response) {
        try {
            const event = this.stripe.webhooks.constructEvent(request.rawBody, request.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
            switch (event.type) {
                case "invoice.payment_succeeded":
                    await this.handlePaymentSucceeded(event.data.object);
                    break;
                case "invoice.payment_failed":
                    await this.handlePaymentFailed(event.data.object);
                    break;
                case "customer.subscription.deleted":
                    await this.handleSubscriptionEnded(event.data.object);
                    break;
                default:
                    console.log("Unhandled event type:", event.type);
            }
            response.status(common_1.HttpStatus.OK).send();
        }
        catch (error) {
            console.error("Webhook error:", error);
            response.status(400).send(`Webhook Error: ${error.message}`);
        }
    }
    async handlePaymentSucceeded(invoice) {
        if (!invoice.subscription)
            return;
        const customer = await this.stripe.customers.retrieve(invoice.customer);
        if ("deleted" in customer)
            return;
        const userId = customer.metadata.userId;
        if (!userId)
            return;
        await this.subscriptionModel.findOneAndUpdate({ userId }, { status: "active" });
    }
    async handlePaymentFailed(invoice) {
        if (!invoice.subscription)
            return;
        await this.subscriptionModel.updateOne({ subscriptionId: invoice.subscription }, { status: "inactive" });
    }
    async handleSubscriptionEnded(subscription) {
        const customer = await this.stripe.customers.retrieve(subscription.customer);
        if ("deleted" in customer)
            return;
        const userId = customer.metadata.userId;
        if (!userId)
            return;
        await this.subscriptionModel.findOneAndUpdate({ subscriptionId: subscription.id }, {
            $set: {
                status: "ended",
                currentPeriodEnd: new Date(),
                price: 0,
            },
        }, { new: true });
    }
    async createChekoutSession(plan, userId) {
        try {
            const customerId = await this.findOrCreateCustomer(userId);
            const subscription = await this.subscriptionModel.findOne({ userId });
            if (subscription && subscription.status !== "ended") {
                return { url: `${this.redirectUrl}` };
            }
            const session = await this.stripe.checkout.sessions.create({
                line_items: [{ price: SUBSCRIPTION_PLANS[plan], quantity: 1 }],
                mode: "subscription",
                success_url: `${this.redirectUrl}/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: this.redirectUrl,
                customer: customerId,
                metadata: { userId },
            });
            return { url: session.url };
        }
        catch (error) {
            console.error("Checkout session error:", error);
            return { error: "Failed to create checkout session" };
        }
    }
    async checkSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({ userId });
        if (!subscription)
            return { isSubscribed: false, newToken: "" };
        if (subscription.status === "ended") {
            return { isSubscribed: false, newToken: "" };
        }
        else {
            return {
                isSubscribed: true,
                newToken: await this.generateSubscriptionToken(userId),
            };
        }
    }
    async cancelSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({
            userId,
            status: "active",
        });
        if (!subscription)
            return { error: "No active subscription found" };
        await this.stripe.subscriptions.update(subscription.subscriptionId, {
            cancel_at_period_end: true,
        });
        await subscription.updateOne({ plan: "Basic", status: "canceled" });
        return { message: "Subscription cancelled successfully" };
    }
    async renewSubscription(userId) {
        try {
            const subscription = await this.getCanceledSubscription(userId);
            if (!subscription)
                return;
            await this.stripe.subscriptions.update(subscription.subscriptionId, {
                cancel_at_period_end: false,
            });
            await this.subscriptionModel.updateOne({ userId, status: "canceled" }, { status: "active" });
        }
        catch (error) {
            console.error("Renew subscription error:", error);
        }
    }
    async findOrCreateCustomer(userId) {
        const existingSubscription = await this.subscriptionModel.findOne({
            userId,
        });
        if (existingSubscription?.customerId)
            return existingSubscription.customerId;
        const customer = await this.stripe.customers.create({
            metadata: { userId },
        });
        return customer.id;
    }
    async hasActiveSubscription(userId) {
        const subscription = await this.subscriptionModel.findOne({
            userId,
            status: "active",
        });
        return !!subscription;
    }
    async getActiveSubscription(userId) {
        return this.subscriptionModel
            .findOne({ userId, status: "active" })
            .sort({ currentPeriodEnd: -1 });
    }
    async getCanceledSubscription(userId) {
        return this.subscriptionModel.findOne({
            userId,
            status: "canceled",
        });
    }
    isSubscriptionExpired(subscription) {
        return subscription.currentPeriodEnd < new Date();
    }
    async generateSubscriptionToken(userId) {
        return this.jwtService.signAsync({ userId, isSubscribed: true }, { expiresIn: "7d", secret: process.env.JWT_SECRET_KEY });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Subscription")),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], PaymentService);
//# sourceMappingURL=payments.service.js.map
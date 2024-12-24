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
var _a, _b, _c;
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
                case "customer.subscription.updated":
                    await this.handleSubscriptionUpdated(event.data.object);
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
        const planId = invoice.lines.data[0].plan.id;
        const planName = Object.entries(SUBSCRIPTION_PLANS).find(([_, id]) => id === planId)?.[0];
        if (!planName) {
            console.log("Unknown plan ID", { planId });
            return;
        }
        await this.subscriptionModel.findOneAndUpdate({ userId }, {
            plan: planName,
            status: "active",
            subscriptionId: invoice.subscription,
            currentPeriodEnd: new Date(invoice.period_end * 1000),
            price: invoice.total / 100,
            customerId: invoice.customer,
        }, { upsert: true, new: true });
        await this.userModel.updateOne({ _id: userId }, { ...PLAN_LIMITS[planName], requestUsed: 0 });
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
        await this.subscriptionModel.updateOne({ userId }, { status: "ended" });
    }
    async handleSubscriptionUpdated(subscription) {
        const customer = await this.stripe.customers.retrieve(subscription.customer);
        if ("deleted" in customer)
            return;
        const userId = customer.metadata.userId;
        if (!userId)
            return;
        if (subscription.cancel_at_period_end) {
            await this.subscriptionModel.updateOne({ userId }, { status: "canceled" });
        }
        else {
            await this.subscriptionModel.updateOne({ userId }, { status: "active" });
        }
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
            return { message: "Subscription renewed successfully" };
        }
        catch (error) {
            console.error("Renew subscription error:", error);
        }
    }
    async mangeStripePortal(userId) {
        try {
            const subscription = await this.subscriptionModel.findOne({ userId });
            if (!subscription)
                return { error: "Subscription not found" };
            const session = await this.stripe.billingPortal.sessions.create({
                customer: subscription.customerId,
                return_url: this.redirectUrl,
            });
            return { url: session.url, message: "Billing portal session created" };
        }
        catch (error) {
            console.error("Manage billing error:", error);
            return { error: "Failed to manage billing" };
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
    async getCanceledSubscription(userId) {
        return this.subscriptionModel.findOne({
            userId,
            status: "canceled",
        });
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
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], PaymentService);
//# sourceMappingURL=payments.service.js.map
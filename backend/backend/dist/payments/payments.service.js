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
        this.stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-04-10',
        });
    }
    async checkSubscription(userId) {
        try {
            const subscription = await this.subscriptionModel.findOne({
                userId,
                subscriptionStatus: 'active',
            }).sort({ currentPeriodEnd: -1 });
            if (!subscription || subscription.currentPeriodEnd < new Date()) {
                return { isSubscribed: false, newToken: null };
            }
            const newToken = await this.jwtService.signAsync({ userId, isSubscribed: true }, { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY });
            return { isSubscribed: true, newToken };
        }
        catch (error) {
            console.error('Error checking subscription:', error);
            return { isSubscribed: false, newToken: null };
        }
    }
    async createCheckoutSession(createPaymentDto, userId) {
        const redirectUrl = process.env.PROD === 'true'
            ? process.env.NEXT_APP_URL_PROD
            : process.env.NEXT_APP_URL_DEV;
        try {
            const customer = await this.stripeClient.customers.create({
                metadata: { userId },
            });
            const session = await this.stripeClient.checkout.sessions.create({
                line_items: [{ price: SUBSCRIPTION_PLANS[createPaymentDto.plan], quantity: 1 }],
                mode: 'subscription',
                success_url: `${redirectUrl}/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${redirectUrl}`,
                customer: customer.id,
                metadata: { userId },
            });
            return { url: session.url };
        }
        catch (error) {
            console.error('Checkout session error:', error);
            return { url: redirectUrl };
        }
    }
    async handleWebhook(request, response) {
        const sig = request.headers['stripe-signature'];
        try {
            const event = this.stripeClient.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            switch (event.type) {
                case 'customer.subscription.created':
                    await this.handleSubscriptionCreated(event.data.object);
                    break;
                case 'customer.subscription.updated':
                    await this.handleSubscriptionUpdated(event.data.object);
                    break;
                case 'customer.subscription.deleted':
                    await this.handleSubscriptionDeleted(event.data.object);
                    break;
                case 'invoice.payment_failed':
                    await this.handlePaymentFailed(event.data.object);
                    break;
            }
            response.status(common_1.HttpStatus.OK).send();
        }
        catch (error) {
            console.error('Webhook error:', error);
            response.status(400).send(`Webhook Error: ${error.message}`);
        }
    }
    async handleSubscriptionCreated(subscription) {
        try {
            const customerId = subscription.customer;
            const customerResponse = await this.stripeClient.customers.retrieve(customerId);
            if ('deleted' in customerResponse) {
                return;
            }
            const userId = customerResponse.metadata.userId;
            if (!userId)
                return;
            await this.subscriptionModel.updateMany({ userId, subscriptionStatus: 'active' }, { subscriptionStatus: 'inactive' });
            await this.createNewSubscription(subscription, userId);
        }
        catch (error) {
            console.error('Handle subscription created error:', error);
        }
    }
    async handleSubscriptionUpdated(subscription) {
        try {
            const customerId = subscription.customer;
            const customerResponse = await this.stripeClient.customers.retrieve(customerId);
            if ('deleted' in customerResponse) {
                return;
            }
            const userId = customerResponse.metadata.userId;
            if (!userId)
                return;
            const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
            const existingSubscription = await this.subscriptionModel.findOne({
                subscriptionId: subscription.id,
                subscriptionStatus: 'active',
            });
            if (existingSubscription && existingSubscription.currentPeriodEnd.getTime() !== currentPeriodEnd.getTime()) {
                await this.subscriptionModel.updateMany({ userId, subscriptionStatus: 'active' }, { subscriptionStatus: 'inactive' });
                await this.createNewSubscription(subscription, userId);
            }
        }
        catch (error) {
            console.error('Handle subscription updated error:', error);
        }
    }
    async handleSubscriptionDeleted(subscription) {
        await this.subscriptionModel.updateOne({ subscriptionId: subscription.id }, { subscriptionStatus: 'inactive' });
    }
    async handlePaymentFailed(invoice) {
        if (!invoice.subscription)
            return;
        await this.subscriptionModel.updateOne({ subscriptionId: invoice.subscription }, { subscriptionStatus: 'inactive' });
    }
    async createNewSubscription(subscription, userId) {
        const planId = subscription.items.data[0].price.id;
        const planName = Object.entries(SUBSCRIPTION_PLANS).find(([_, id]) => id === planId)?.[0];
        if (!planName)
            return;
        const userPaymentinfo = await this.stripeClient.customers.listSources(subscription.customer, { object: 'card' });
        const card = userPaymentinfo.data[0];
        await this.subscriptionModel.create({
            userId,
            plan: planName,
            cardBrand: 'Visa',
            cardLast4: '4242',
            subscriptionStatus: 'active',
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            price: subscription.items.data[0].price.unit_amount / 100,
        });
        await this.userModel.updateOne({ _id: userId }, { ...PLAN_LIMITS[planName], requestUsed: 0 });
    }
    async cancelSubscription(userId) {
        try {
            const subscription = await this.subscriptionModel.findOne({
                userId,
                subscriptionStatus: 'active',
            });
            if (!subscription) {
                return { error: 'No active subscription found' };
            }
            await this.stripeClient.subscriptions.update(subscription.subscriptionId, {
                cancel_at_period_end: true,
            });
            await this.subscriptionModel.updateOne({ subscriptionId: subscription.id }, { subscriptionStatus: 'canceled' });
            return {
                success: true,
                message: 'Subscription will be canceled at the end of the billing period'
            };
        }
        catch (error) {
            console.error('Cancel subscription error:', error);
            return { error: 'Failed to cancel subscription' };
        }
    }
    async renewSubscription(userId) {
        try {
            const subscription = await this.subscriptionModel.findOne({
                userId,
                subscriptionStatus: 'canceled',
            });
            if (!subscription) {
                return { error: 'No canceled subscription found to renew' };
            }
            await this.stripeClient.subscriptions.update(subscription.subscriptionId, {
                cancel_at_period_end: false,
            });
            await this.subscriptionModel.updateOne({ subscriptionId: subscription.id }, { subscriptionStatus: 'active' });
            return {
                success: true,
                message: 'Subscription has been renewed successfully'
            };
        }
        catch (error) {
            console.error('Renew subscription error:', error);
            return { error: 'Failed to renew subscription' };
        }
    }
    async manageBilling(userId) {
        const userSubscription = await this.subscriptionModel.findOne({
            userId,
        });
        if (!userSubscription) {
            return { error: 'No active subscription found' };
        }
        const customerId = userSubscription.customerId;
        const session = await this.stripeClient.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.PROD === 'true' ? process.env.NEXT_APP_URL_PROD : process.env.NEXT_APP_URL_DEV,
        });
        return { url: session.url };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Subscription')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], PaymentService);
//# sourceMappingURL=payments.service.js.map
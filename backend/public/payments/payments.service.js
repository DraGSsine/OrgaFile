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
let PaymentService = class PaymentService {
    constructor(subscriptionModel, userModel) {
        this.subscriptionModel = subscriptionModel;
        this.userModel = userModel;
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            throw new Error('Stripe secret key not defined in environment variables');
        }
        this.stripeClient = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2024-04-10',
        });
    }
    async createCheckoutSession(createPaymentDto, userId) {
        try {
            const existingSubscription = await this.subscriptionModel.findOne({
                userId,
                subscriptionStatus: 'active',
            });
            if (existingSubscription && existingSubscription.customerId) {
                console.log('User is already subscribed, redirecting to billing portal');
                try {
                    const sessionPortal = await this.stripeClient.billingPortal.sessions.create({
                        customer: existingSubscription.customerId,
                        return_url: `${process.env.NEXT_APP_URL}/dashboard`,
                    });
                    return { url: sessionPortal.url };
                }
                catch (error) {
                    throw new Error(`Could not create billing portal session ${error} `);
                }
            }
            const customer = await this.stripeClient.customers.create({
                metadata: { userId },
            });
            const session = await this.stripeClient.checkout.sessions.create({
                line_items: [
                    {
                        price: createPaymentDto.price_id,
                        quantity: 1,
                    },
                ],
                payment_method_types: ['card'],
                mode: 'subscription',
                success_url: `${process.env.NEXT_APP_URL}/payment-successful?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_APP_URL}`,
                customer: customer.id,
                metadata: {
                    userId: userId,
                },
            });
            return { url: session.url };
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            throw new Error('Could not create checkout session');
        }
    }
    async handleWebhook(request, response) {
        const sig = request.headers['stripe-signature'];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error('Stripe webhook secret not defined in environment variables');
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send('Webhook secret not configured');
            return;
        }
        let event;
        try {
            event = this.stripeClient.webhooks.constructEvent(request.rawBody, sig, webhookSecret);
        }
        catch (err) {
            console.error('Webhook signature verification failed:', err);
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send(`Webhook Error: ${err.message}`);
            return;
        }
        const session = event.data.object;
        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutSession(session);
                break;
            case 'invoice.payment_succeeded':
                await this.handleInvoicePaymentSucceeded(session);
            default:
                console.warn(`Unhandled event type: ${event.type}`);
        }
        response.status(common_1.HttpStatus.OK).send();
    }
    async handleCheckoutSession(session) {
        try {
            const subscription = await this.stripeClient.subscriptions.retrieve(session.subscription);
            const userId = session.metadata?.userId;
            if (!userId) {
                console.warn(`UserId not found in session metadata for session: ${session.id}`);
                return;
            }
            const plan = this.setPlanByItsId(subscription.items.data[0].price.id);
            await this.subscriptionModel.create({
                userId,
                plan,
                subscriptionStatus: 'active',
                subscriptionId: session.subscription?.toString(),
                customerId: subscription.customer,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
            const { storage, requestLimit } = this.setStorageBaseOnPlan(plan);
            await this.userModel.updateOne({ _id: userId }, { storage, requestLimit });
        }
        catch (error) {
            console.error('Error handling checkout session:', error);
        }
    }
    async handleInvoicePaymentSucceeded(session) {
        try {
            const subscription = await this.stripeClient.subscriptions.retrieve(session.subscription);
            await this.subscriptionModel.updateOne({ customerId: subscription.customer }, {
                subscriptionStatus: 'active',
                subscriptionId: session.subscription?.toString(),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
        }
        catch (error) {
            console.error('Error handling invoice payment succeeded:', error);
        }
    }
    setPlanByItsId(priceId) {
        if (priceId == 'price_1PIwvSCRq7xCj4sRtnFgoawN') {
            return 'Basic';
        }
        else if (priceId == 'price_1PIwwvCRq7xCj4sRxgJYesQ8') {
            return 'Premium';
        }
        else if (priceId == 'price_1PIwwECRq7xCj4sRV1O6QKeK') {
            return 'Standard';
        }
        else {
            throw new Error('Invalid price ID');
        }
    }
    setStorageBaseOnPlan(plan) {
        if (plan == 'Basic') {
            return { storage: 5, requestLimit: 100 };
        }
        else if (plan == 'Standard') {
            return { storage: 15, requestLimit: 400 };
        }
        else if (plan == 'Premium') {
            return { storage: 20, requestLimit: 500 };
        }
        else {
            throw new Error('Invalid plan');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Subscription')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PaymentService);
//# sourceMappingURL=payments.service.js.map
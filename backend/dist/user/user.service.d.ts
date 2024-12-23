import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { Model } from "mongoose";
import { UserDocument } from "..//schemas/auth.schema";
export declare class UserService {
    private readonly userModel;
    private readonly folderModel;
    private readonly fileModel;
    private readonly subscriptionModel;
    private readonly removedFileModel;
    private stripeClient;
    constructor(userModel: Model<UserDocument>, folderModel: Model<any>, fileModel: Model<any>, subscriptionModel: Model<any>, removedFileModel: Model<any>);
    updateProfile(createUserDto: CreateUserDto, userId: string): Promise<any>;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string): Promise<string>;
    remove(userId: string): Promise<any>;
    formatPaymentHistory(payments: any, invoices: any, subscriptiondb: any, user: any, paymentMethod: any): {
        plan: any;
        fullName: any;
        email: any;
        subscriptionEnds: Date;
        price: number;
        status: any;
        currency: any;
        lastFourDigits: any;
        cardBrand: any;
        subscriptionHistory: any;
    };
    getUserInfo(userId: string): Promise<{
        plan: any;
        fullName: any;
        email: any;
        subscriptionEnds: Date;
        price: number;
        status: any;
        currency: any;
        lastFourDigits: any;
        cardBrand: any;
        subscriptionHistory: any;
    }>;
    hasSubscription(userId: string): Promise<boolean>;
}

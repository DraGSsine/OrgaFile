import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { Model } from "mongoose";
import { UserDocument } from "..//schemas/auth.schema";
import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private readonly configService;
    private readonly userModel;
    private readonly folderModel;
    private readonly fileModel;
    private readonly subscriptionModel;
    private readonly removedFileModel;
    private stripeClient;
    private readonly s3Client;
    constructor(configService: ConfigService, userModel: Model<UserDocument>, folderModel: Model<any>, fileModel: Model<any>, subscriptionModel: Model<any>, removedFileModel: Model<any>);
    updateProfile(createUserDto: CreateUserDto, userId: string): Promise<any>;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string): Promise<string>;
    remove(userId: string): Promise<string>;
    formatPaymentHistory(payments: any, invoices: any, subscriptiondb: any, user: any, stripeSubscription: any): Promise<{
        plan: any;
        fullName: any;
        email: any;
        subscriptionEnds: string;
        price: number;
        status: any;
        currency: any;
        lastFourDigits: any;
        cardBrand: any;
        subscriptionHistory: any[];
    }>;
    getUserInfo(userId: any): Promise<{
        plan: any;
        fullName: any;
        email: any;
        subscriptionEnds: string;
        price: number;
        status: any;
        currency: any;
        lastFourDigits: any;
        cardBrand: any;
        subscriptionHistory: any[];
    }>;
    hasSubscription(userId: string): Promise<boolean>;
}

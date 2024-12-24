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
    updateProfile(createUserDto: CreateUserDto, userId: string): unknown;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string): unknown;
    remove(userId: string): unknown;
    formatPaymentHistory(payments: any, invoices: any, subscriptiondb: any, user: any, stripeSubscription: any): unknown;
    getUserInfo(userId: any): unknown;
    hasSubscription(userId: string): unknown;
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Model } from 'mongoose';
import { UserDocument } from '..//schemas/auth.schema';
import { SubscriptionHistory } from '..//types/type';
export declare class UserService {
    private readonly userModel;
    private readonly folderModel;
    private readonly fileModel;
    private readonly subscriptionModel;
    private readonly removedFileModel;
    constructor(userModel: Model<UserDocument>, folderModel: Model<any>, fileModel: Model<any>, subscriptionModel: Model<any>, removedFileModel: Model<any>);
    updateProfile(createUserDto: CreateUserDto, userId: string): Promise<any>;
    updatePassword(updatePassowrdDto: UpdatePasswordDto, userId: string): Promise<string>;
    remove(userId: string): Promise<any>;
    getUserInfo(userId: string): Promise<{
        plan: any;
        fullName: string;
        email: string;
        subscriptionEnds: any;
        price: any;
        subscriptionHistory: SubscriptionHistory[];
    }>;
    hasSubscription(userId: string): Promise<boolean>;
}

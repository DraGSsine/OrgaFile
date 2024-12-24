import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    fullName: string;
    email: string;
    password: string;
    storage: number;
    storageUsed: number;
    requestLimit: number;
    requestUsed: number;
    role: 'user' | 'admin';
    profilePictureUrl: string;
    isEmailVerified: boolean;
}
export declare const userSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;

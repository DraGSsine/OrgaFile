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
export declare const userSchema: any;

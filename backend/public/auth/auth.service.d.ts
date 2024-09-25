/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { signInDto, signUpDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { subscriptionDocument } from 'src/schemas/subscriptions.schema';
export declare class AuthService {
    private jwtService;
    private readonly userModel;
    private readonly subscriptionModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>, subscriptionModel: Model<subscriptionDocument>);
    signIn(signInDto: signInDto): Promise<{
        token: string;
        isSubscribed: boolean;
        userInfo: {
            email: string;
            fullName: string;
        };
    }>;
    signUp(signUpDto: signUpDto): Promise<{
        message: string;
    }>;
}

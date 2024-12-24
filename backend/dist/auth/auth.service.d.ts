import { signInDto, signUpDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { subscriptionDocument } from '../schemas/subscriptions.schema';
export declare class AuthService {
    private jwtService;
    private readonly userModel;
    private readonly subscriptionModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>, subscriptionModel: Model<subscriptionDocument>);
    signIn(signInDto: signInDto): Promise<{
        token: string;
        user: {
            email: string;
            fullName: string;
        };
    }>;
    signUp(signUpDto: signUpDto): Promise<{
        token: string;
        user: {
            email: string;
            fullName: string;
        };
    }>;
    private generateTokens;
}

import { AuthService } from "./auth.service";
import { signInDto, signUpDto } from "./dto/auth.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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

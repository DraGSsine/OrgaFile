import { AuthService } from './auth.service';
import { Response } from 'express';
import { signInDto, signUpDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private resHeaders;
    signIn(signInDto: signInDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signUp(signUpDto: signUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signOut(res: Response): Response<any, Record<string, any>>;
}

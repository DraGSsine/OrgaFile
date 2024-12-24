import { AuthService } from './auth.service';
import { Response } from 'express';
import { signInDto, signUpDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private resHeaders;
    signIn(signInDto: signInDto, res: Response): unknown;
    signUp(signUpDto: signUpDto, res: Response): unknown;
    signOut(res: Response): any;
}

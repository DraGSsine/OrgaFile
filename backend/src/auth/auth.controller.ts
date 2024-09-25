import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto, signUpDto } from "./dto/auth.dto";

@Controller("api/auth")
export class AuthController {
    constructor(private authService:AuthService){};

    @Post("signin")
    signIn(@Body() signInDto:signInDto){
        return this.authService.signIn(signInDto);
    }
    @Post("signup")
    signUp(@Body() signUpDto:signUpDto){
        return this.authService.signUp(signUpDto);
    }
}
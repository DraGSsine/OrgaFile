import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService:AuthService){};

    @Post("login")
    signIn(){
        return this.authService.signIn();
    }
    @Post("signup")
    signUp(@Body() registerDto:registerDto){
        return this.authService.signUp(registerDto);
    }
}
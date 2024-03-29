import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInDto, signUpDto } from "./dto/auth.dto";
import { RefreshJwtGuard } from "src/guards/refresh.guard";

@Controller("api/auth")
export class AuthController {
    constructor(private authService:AuthService){};

    @Post("signIn")
    signIn(@Body() signInDto:signInDto){
        return this.authService.signIn(signInDto);
    }
    @Post("signup")
    signUp(@Body() signUpDto:signUpDto){
        return this.authService.signUp(signUpDto);
    }
    @Post("verify")
    verify(@Request() req:any){
        return this.authService.verify(req);
    }
    @UseGuards(RefreshJwtGuard)
    @Post("refresh")
    refresh(@Request() req:any){
        return this.authService.refresh(req.user);
    }
}
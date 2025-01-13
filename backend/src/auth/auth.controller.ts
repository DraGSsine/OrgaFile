import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CookieOptions, Response, Request } from "express";
import { signInDto, signUpDto } from "./dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private resHeaders: CookieOptions = {
    domain: process.env.PROD === "true" ? ".orgafile.com" : "localhost",
    sameSite: process.env.PROD === "true" ? "none" : "lax",
    secure: process.env.PROD === "true" ? true : false,
    httpOnly: true,
  };

  @Post("signin")
  async signIn(@Body() signInDto: signInDto, @Res() res: Response) {
    const { token, user } = await this.authService.signIn(signInDto);

    res.cookie("token", token, this.resHeaders);
    res.cookie("userId", user.id, { ...this.resHeaders, httpOnly: false });
    return res.send({
      userInfo: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  }

  @Post("signup")
  async signUp(@Body() signUpDto: signUpDto, @Res() res: Response) {
    const { token, user } = await this.authService.signUp(signUpDto);

    res.cookie("token", token, this.resHeaders);
    res.cookie("userId", user.id, { ...this.resHeaders, httpOnly: false });
    return res.send({
      message: "User created successfully",
      userInfo: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  }

  @Post("google")
  async googleAuth(@Req() req:Request,@Res() res: Response) {
    const token = req.headers.authorization.split(" ")[1];
    const { accessToken, user } = await this.authService.googleAuth(token);
    res.cookie("token", accessToken, this.resHeaders);
    res.cookie("userId", user.id, { ...this.resHeaders, httpOnly: false });
    return res.send({
      userInfo: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    // Handle the Google OAuth2 callback
    return req.user;
  }
  @Get("signout")
  signOut(@Res() res: Response, @Req() req: Request) {
    const cookies = req.cookies;
    for (const cookie in cookies) {
      res.clearCookie(cookie, this.resHeaders);
    }
    return res.send({ message: "Signed out successfully" });
  }
}

import { Body, Controller, Get, Post, Res,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response,Request } from 'express';
import { signInDto, signUpDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private resHeaders: CookieOptions = {
    domain: process.env.PROD === 'true' ? '.orgafile.com' : 'localhost',
    sameSite: process.env.PROD === 'true' ? 'none' : 'lax',
    secure: process.env.PROD === 'true' ? true : false,
    httpOnly: true,
  };

  @Post('signin')
  async signIn(@Body() signInDto: signInDto, @Res() res: Response) {
    const { token, user } = await this.authService.signIn(signInDto);

    res.cookie('token', token, this.resHeaders);
    res.cookie('userId', user.id, {...this.resHeaders,httpOnly:false});
    return res.send({
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Post('signup')
  async signUp(@Body() signUpDto: signUpDto, @Res() res: Response) {
    return res.send({ message: 'Join the waiting list to get notified when we launch' });
    const { token, user } = await this.authService.signUp(signUpDto);

    res.cookie('token', token, this.resHeaders);
    res.cookie('userId', user.id, {...this.resHeaders,httpOnly:false});
    return res.send({
      message: 'User created successfully',
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Get('signout')
  signOut(@Res() res: Response, @Req() req:Request) {
    const cookies = req.cookies;
    for (const cookie in cookies) {
      res.clearCookie(cookie, this.resHeaders);
    }
    return res.send({ message: 'Signed out successfully' });
  }
}

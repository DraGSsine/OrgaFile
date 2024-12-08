import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { signInDto, signUpDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private resHeaders: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    domain: 'localhost',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };

  @Post('signin')
  async signIn(@Body() signInDto: signInDto, @Res() res: Response) {
    const { token, user } = await this.authService.signIn(signInDto);

    res.cookie('token', token, this.resHeaders);
    res.cookie(
      'userInfo',
      JSON.stringify({ email: user.email, fullName: user.fullName }),
      { ...this.resHeaders, httpOnly: false },
    );
    return res.send({
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Post('signup')
  async signUp(@Body() signUpDto: signUpDto, @Res() res: Response) {
    const { token, user } = await this.authService.signUp(signUpDto);

    res.cookie('token', token, this.resHeaders);
    res.cookie(
      'userInfo',
      JSON.stringify({ email: user.email, fullName: user.fullName }),
      { ...this.resHeaders, httpOnly: false },
    );
    return res.send({
      message: 'User created successfully',
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Get('signout')
  signOut(@Res() res: Response) {
    res.clearCookie('token');
    res.clearCookie('userInfo');
    return res.send({ message: 'Signed out successfully' });
  }
}

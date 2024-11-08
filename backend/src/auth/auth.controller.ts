import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { signInDto, signUpDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: signInDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(signInDto);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.cookie(
      'userInfo',
      JSON.stringify({ email: user.email, fullName: user.fullName }),
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
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
    const { accessToken, refreshToken, user } =
      await this.authService.signUp(signUpDto);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.cookie(
      'userInfo',
      JSON.stringify({ email: user.email, fullName: user.fullName }),
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    );
    return res.send({
      message: 'User created successfully',
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Post('refresh-token')
  async refreshToken(
    @Res() res: Response,
    @Body('refreshToken') refreshToken: string,
  ) {
    const { accessToken } = await this.authService.refreshToken(refreshToken);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return res.send({
      message: 'Token refreshed successfully',
    });
  }
  @Get('signout')
  signOut(@Res() res: Response) {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.clearCookie('userInfo');
    return res.send({ message: 'Signed out successfully' });
  }
}

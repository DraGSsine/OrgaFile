import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from './dto/auth.dto';
import { Response } from 'express';

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
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie(
      'userInfo',
      JSON.stringify({ email: user.email, fullName: user.fullName }),
      { httpOnly: true, secure: false, sameSite: 'lax' },
    );
    return res.send({
      userInfo: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  }

  @Post('signup')
  signUp(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(signUpDto);
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

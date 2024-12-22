import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieOptions, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private resHeaders: CookieOptions = {
    domain: process.env.PROD === 'true' ? '.orgafile.com' : 'localhost',
    sameSite: process.env.PROD === 'true' ? 'none' : 'lax',
    secure: process.env.PROD === 'true' ? true : false,
    httpOnly: process.env.PROD === 'true' ? true : false,
  };

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('api/upgrades')
  async signIn(@Body() body:any , @Res() res: Response) {
    const { plan } = body;
    res.cookie('plan', plan, this.resHeaders);
    return res.send(`Plan upgraded successfully ${plan}`);
  }
}

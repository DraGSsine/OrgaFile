import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class RefreshJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext):Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      if (type !== 'Refresh') {
        throw new UnauthorizedException('Invalid token');
      }
      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.REFRESH_TOKEN,
        });
        request.user = payload;
      } catch (error) {
          throw new UnauthorizedException('Invalid token');
      }
      return true;
    }
  }
  
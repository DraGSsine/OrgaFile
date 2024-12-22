

import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId = request.userId;
    
      const hasSubscription = await this.userService.hasSubscription(userId);
    
      if (!hasSubscription) {
        throw new ForbiddenException('User does not have an active subscription');
      }
    
      return true;
    }
    
}
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('recent-folders')
  async cloudInfo(@Req() req: any) {
    return this.dashboardService.recentFolders(req.user.userId);
  }

  @Get('load-user-limits')
  loadUserLimits(@Req() req: any) {
    return this.dashboardService.loadUserLimits(req.user.userId);
  }
}

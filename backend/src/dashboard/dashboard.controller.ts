import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('load-cloud-info')
  async cloudInfo(@Req() req: any) {
    return this.dashboardService.cloudInfo(req.user.userId);
  }


  @Get('load-user-limits')
  loadUserLimits(@Req() req: any) {
    return this.dashboardService.loadUserLimits(req.user.userId);
  }
}

import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    cloudInfo(req: any): Promise<{
        filesFormatInfo: {
            name: string;
            size: number;
            numberOfFiles: number;
        }[];
        storageUsed: number;
        storage: number;
    }>;
    loadUserLimits(req: any): Promise<{
        storageLimit: number;
        storageUsed: number;
        requestLimit: number;
        requestUsed: number;
    }>;
}

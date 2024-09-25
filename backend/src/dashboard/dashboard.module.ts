import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { fileSchema } from '../schemas/files.schema';
import { folderSchema } from '../schemas/folders.schema';
import { removedFilesSchema } from '../schemas/removedFiles.schema';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'File', schema: fileSchema },
      { name: 'Folder', schema: folderSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, JwtService,AuthGuard],
})
export class DashboardModule {}

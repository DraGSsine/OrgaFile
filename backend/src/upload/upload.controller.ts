import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseInterceptors,
  Req,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/files')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: any,
  ) {
    return this.uploadService.uploadFiles(files, req.user.userId);
  }

  @Post('restore')
  async restoreFile(@Body() requestBody: { fileId: string }, @Req() req: any) {
    const { fileId } = requestBody;
    return this.uploadService.restoreFile(req, fileId);
  }
  @Get('load')
  async loadAllFiles(@Req() req: any) {
    return this.uploadService.loadFiles(req.user.userId);
  }

  @Get('recent')
  async findRecentFiles(@Req() req: any) {
    return this.uploadService.loadRecentFiles(req.user.userId);
  }

  @Get('removed')
  async findRemovedFiles(@Req() req: any) {
    return this.uploadService.loadRemovedFiles(req.user.userId);
  }

  @Delete('remove')
  remove(
    @Req() req: any,
    @Body() requestBody: { fileId: string; isPermanently: boolean },
  ) {
    const { fileId, isPermanently } = requestBody;
    return this.uploadService.remove(req, fileId, isPermanently);
  }

  @Delete('removemany')
  removeMany(
    @Req() req: any,
    @Body() requestBody: { files: string[]; isPermanently: boolean },
  ) {
    const { files, isPermanently } = requestBody;
    return this.uploadService.removeMany(req, files, isPermanently);
  }
}

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
  BadRequestException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import multer from 'multer';

@Controller('api/files')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Only PDF, DOCX, TXT, and SLSX files are allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: any,
  ) {
    try {
      return this.uploadService.uploadFiles(files, req.user.userId);
    } catch (error) {
      if (
        error instanceof multer.MulterError &&
        error.code === 'LIMIT_FILE_SIZE'
      ) {
        throw new BadRequestException('File size exceeds the limit of 20 MB');
      }
      throw new BadRequestException('An error occurred during file upload');
    }
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

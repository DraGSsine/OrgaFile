import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/files')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async UploadFiles(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.uploadService.UploadFiles(file, req.user.userId);
  }

  @Get('load')
  async findAll(@Req() req: any) {
    return this.uploadService.LoadFiles(req.user.userId);
  }

  @Get('recent')
  async findRecentFiles(@Req() req: any) {
    console.log('request reached here');
    return this.uploadService.LoadRecentFiles(req.user.userId);
  }

  @Get('removed')
  async findRemovedFiles(@Req() req: any) {
    return this.uploadService.LoadRemovedFiles(req.user.userId);
  }

  @Delete('remove')
  remove(
    @Req() req: any,
    @Body() requestBody: { fileId: string; isPremanently: boolean },
  ) {
    const { fileId, isPremanently } = requestBody;
    console.log("is the file will be removed "+isPremanently)
    return this.uploadService.remove(req, fileId,isPremanently);
  }

  @Delete('removemany')
  removeMany(@Req() req: any, @Body() requestBody: { files: string[]; isPremanently: boolean }) {
    const { files, isPremanently } = requestBody;
    return this.uploadService.removeMany(req, files,isPremanently);
  }
}

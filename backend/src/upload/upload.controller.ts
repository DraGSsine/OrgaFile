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
  async findAll(@Req() req: any){
    return this.uploadService.LoadFiles(req.user.userId);
  }

  @Get("removed-files")
  async findRemovedFiles(@Req() req: any){
    return this.uploadService.LoadRemovedFiles(req.user.userId);
  }

  @Delete('remove')
  remove(@Req() req:any, @Body('fileid') fileId: ObjectId) {
    return this.uploadService.remove(req, fileId);
  }

  @Delete('removemany')
  removeMany(@Req() req:any, @Body('files') files: ObjectId[]) {
    return this.uploadService.removeMany(req, files);
  }
}

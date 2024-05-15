import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ObjectId } from 'mongoose';

@Controller('api/folders')
@UseGuards(AuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get('load')
  loadFolders(@Req() req: any) {
    return this.foldersService.loadFolders(req.user.userId);
  }
  @Get('load/:id')
  loadOneFolder(@Param('id') id: ObjectId,@Req() req: any) {
    return this.foldersService.loadOneFolder(id,req.user.userId);
  }
  @Get('download/:id')
  async downloadFolder(@Param('id') id: ObjectId,@Req() req:any, @Res() res: any) {
    const archive = await this.foldersService.downloadFolder(id, req.user.userId);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=archive.zip');
    res.setHeader('Content-Length', archive.length);
    res.send(archive);
  }
}

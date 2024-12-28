import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
  Param,
  Res,
} from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { SubscriptionGuard } from "../guards/subscription.guard";
import { UploadService } from "./upload.service";
import { FileMetaData } from "src/types/type";

@Controller("api/files")
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("upload")
  @UseGuards(SubscriptionGuard)
  async uploadFile(@Body() files: { files: FileMetaData[] }, @Req() req: any) {
    try {
      return this.uploadService.uploadFiles(files.files, req.user.userId);
    } catch (error) {
      console.error("Upload file error:", error);
      const filesIds = files.files.map((file) => file.fileId);
      await this.uploadService.fialdUploadCleanup(req,filesIds);
      throw new BadRequestException("Failed to upload file");
    }
  }

  @Post("restore")
  @UseGuards(SubscriptionGuard)
  async restoreFile(@Body() requestBody: { fileId: string }, @Req() req: any) {
    const { fileId } = requestBody;
    return this.uploadService.restoreFile(req, fileId);
  }
  @Get("load")
  async loadAllFiles(@Req() req: any) {
    return this.uploadService.loadFiles(req.user.userId);
  }

  @Get("recent")
  async findRecentFiles(@Req() req: any) {
    return this.uploadService.loadRecentFiles(req.user.userId);
  }

  @Get("removed")
  async findRemovedFiles(@Req() req: any) {
    return this.uploadService.loadRemovedFiles(req.user.userId);
  }

  @Delete("remove")
  @UseGuards(SubscriptionGuard)
  remove(
    @Req() req: any,
    @Body() requestBody: { fileId: string; isPermanently: boolean }
  ) {
    const { fileId, isPermanently } = requestBody;
    return this.uploadService.remove(req, fileId, isPermanently);
  }

  @Delete("removemany")
  @UseGuards(SubscriptionGuard)
  removeMany(
    @Req() req: any,
    @Body() requestBody: { files: string[]; isPermanently: boolean }
  ) {
    const { files, isPermanently } = requestBody;
    return this.uploadService.removeMany(req, files, isPermanently);
  }
  @Get("download/:fileId")
  @UseGuards(SubscriptionGuard)
  async downloadFile(
    @Param("fileId") fileId: string,
    @Req() req: any,
    @Res() res: any
  ) {
    try {
      const { fileStream, fileName, fileSize } =
        await this.uploadService.downloadFile(req, fileId);

      res.set({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileSize,
      });

      fileStream.on("error", (error) => {
        console.error("File stream error:", error);
        res.status(500).send("Failed to download file");
      });

      fileStream.pipe(res);
    } catch (error) {
      console.error("Download file error:", error);
      throw new BadRequestException("Failed to download file");
    }
  }
}

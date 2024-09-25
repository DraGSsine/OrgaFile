import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { folderSchema } from '../schemas/folders.schema';
import { fileSchema } from '../schemas/files.schema';
import { removedFilesSchema } from '../schemas/removedFiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'File', schema: fileSchema },
      { name: 'Folder', schema: folderSchema },
      { name: 'RemovedFile', schema: removedFilesSchema },
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtService],
})
export class UploadModule {}

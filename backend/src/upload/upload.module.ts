import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { folderSchema } from '../schemas/folders.schema';
import { fileSchema } from '../schemas/files.schema';
import { removedFilesSchema } from '../schemas/removedFiles.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'File', schema: fileSchema },
      { name: 'Folder', schema: folderSchema },
      { name: 'RemovedFile', schema: removedFilesSchema },
    ]),
    UserModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtService],
})
export class UploadModule {}

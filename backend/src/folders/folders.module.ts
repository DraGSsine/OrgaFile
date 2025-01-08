import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { folderSchema } from '../schemas/folders.schema';
import { UserModule } from '../user/user.module';
import { removedFilesSchema } from 'src/schemas/removedFiles.schema';
import { fileSchema } from 'src/schemas/files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RemovedFile', schema: removedFilesSchema },
      { name: 'Folder', schema: folderSchema },
      { name: 'File', schema: fileSchema },
    ]),
    UserModule,
  ],
  controllers: [FoldersController],
  providers: [FoldersService, JwtService],
})
export class FoldersModule {}

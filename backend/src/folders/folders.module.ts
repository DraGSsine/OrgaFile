import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { JwtService } from '@nestjs/jwt';
import { userSchema } from '../schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { folderSchema } from '../schemas/folders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'Folder', schema: folderSchema },
    ]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService, JwtService],
})
export class FoldersModule {}

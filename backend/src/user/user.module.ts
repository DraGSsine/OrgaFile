import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { folderSchema } from 'src/schemas/folders.schema';
import { fileSchema } from 'src/schemas/files.schema';
import { subscriptionSchema } from 'src/schemas/subscriptions.schema';
import { removedFilesSchema } from 'src/schemas/removedFiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
      { name: 'folder', schema: folderSchema },
      { name: 'file', schema: fileSchema },
      { name: 'subscription', schema: subscriptionSchema },
      { name: 'removedFile', schema: removedFilesSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard, JwtService],
})
export class UserModule {}

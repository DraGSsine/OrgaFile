import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/auth.schema';
import { AuthGuard } from '../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { folderSchema } from '..//schemas/folders.schema';
import { fileSchema } from '..//schemas/files.schema';
import { subscriptionSchema } from '../schemas/subscriptions.schema';
import { removedFilesSchema } from '../schemas/removedFiles.schema';

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
  exports: [UserService],
})
export class UserModule {}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocument } from 'src/schemas/auth.schema';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}
  async loadFolders(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.folders;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load folders');
    }
  }
}

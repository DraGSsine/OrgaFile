import { InjectModel } from '@nestjs/mongoose';
import { FoldersModule } from '../folders/folders.module';
import { FolderDocument } from '../schemas/folders.schema';
import { Model } from 'mongoose';
import { FileDocument } from '../schemas/files.schema';
import { UserDocument } from '../schemas/auth.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('File') private readonly fileModel: Model<FileDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Folder') private readonly folderModel: Model<FolderDocument>,
  ) {}
  async cloudInfo(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      type filesFormatInfoType = {
        name: string;
        size: number;
        numberOfFiles: number;
      };
      const filesFormatInfo: filesFormatInfoType[] = [
        {
          name: 'pdf',
          size: 0,
          numberOfFiles: 0,
        },
        {
          name: 'docx',
          size: 0,
          numberOfFiles: 0,
        },
        {
          name: 'txt',
          size: 0,
          numberOfFiles: 0,
        },
        {
          name: 'xlsx',
          size: 0,
          numberOfFiles: 0,
        },
      ];

      const userFiles = await this.fileModel.findOne({ userId });
      if (!userFiles) {
        return {
          filesFormatInfo,
          storageUsed: 0,
          storage: user.storage,
        };
      }
      const files = userFiles.files;

      files.forEach((file) => {
        const index = filesFormatInfo.findIndex(
          (item) => item.name === file.format,
        );
        if (index !== -1) {
          filesFormatInfo[index].size += file.size;
          filesFormatInfo[index].numberOfFiles += 1;
        }
      });
      // to gb
      return {
        filesFormatInfo,
        storageUsed: user.storageUsed / 1024 / 1024 / 1024,
        storage: user.storage,
      };
    } catch (error) {
      throw error;
    }
  }

  async loadUserLimits(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        storageLimit: user.storage,
        storageUsed: user.storageUsed,
        requestLimit: user.requestLimit,
        requestUsed: user.requestUsed,
      };
    } catch (error) {
      throw error;
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Files, userDocument } from 'src/schemas/auth.schema';
import { AnalyzeFile } from 'src/ai/openai-setup';
import * as crypto from 'crypto';
@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}
  private readonly s3Client = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('S3_REGION'),
  });

  async UploadFiles(file: Express.Multer.File, userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const nameKey = `${file.originalname}-${crypto.randomBytes(16).toString('hex')}`;
      const fileType = file.mimetype;
      const params = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: nameKey,
        Body: file.buffer,
      };

      await this.s3Client.upload(params).promise();

      const data: Files = {
        id: nameKey,
        topic: 'General',
        url: `${this.configService.get('S3_BUCKET_URL')}${file.originalname}`,
        format: file.originalname.split('.').pop(),
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
      };
      // const res = await AnalyzeFile(data, fileType);
      const res = 'General';
      data.topic = res;
      user.files.push(data);
      await user.save();
      return data;
    } catch (error) {
      if (error.code === 'UnsupportedMediaType') {
        throw new UnsupportedMediaTypeException();
      } else {
        throw error;
      }
    }
  }

  async LoadFiles(userId: ObjectId) {
    try {
      const files = await this.userModel.findById(userId);
      if (!files) {
        throw new NotFoundException('User not found');
      }
      console.log(files);
      return files.files;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async LoadRecentFiles(userId: ObjectId) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Filter files that are 7 days old or newer
      const recentFiles = user.files.filter(
        (file: any) => new Date(file.createdAt) > oneWeekAgo,
      );

      return recentFiles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async LoadRemovedFiles(userId: ObjectId) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.deletedFiles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async remove(req: any, fileId: string, isPremanently: boolean) {
    try {
      const id = req.user.userId;
      const user = await this.userModel.findById(id);
      let DeleteFile: any;
      let fileIndex: number;
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (isPremanently) {
        console.log('permanently');
        console.log(fileId);
        fileIndex = user.deletedFiles.findIndex(
          (file: any) => file.id === fileId,
        );
        if (fileIndex === -1) {
          throw new NotFoundException('File does not exist');
        }
        // delete file from deletedFiles

        DeleteFile = user.deletedFiles[fileIndex];
        user.deletedFiles.splice(fileIndex, 1);

        // Delete file from S3
        const params = {
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Key: DeleteFile.id,
        };
        await this.s3Client.deleteObject(params).promise();
      } else {
        // Move file to deletedFiles
        fileIndex = user.files.findIndex((file: any) => file.id === fileId);
        console.log(fileIndex == -1);
        if (fileIndex === -1) {
          throw new NotFoundException('File does not exist');
        }
        DeleteFile = user.files[fileIndex];
        user.deletedFiles.push(DeleteFile);
        user.files.splice(fileIndex, 1);
      }
      await user.save();
      return DeleteFile;
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove file', error.message);
    }
  }

  async removeMany(req: any, fileIds: string[], isPremanently: boolean) {
    try {
      const id = req.user.userId;
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const deletedFiles = [];
      if (isPremanently) {
        for (const fileId of fileIds) {
          const fileIndex = user.deletedFiles.findIndex(
            (file: any) => file.id === fileId,
          );
          if (fileIndex === -1) {
            throw new NotFoundException('File does not exist');
          }
          const DeleteFile = user.deletedFiles[fileIndex];
          user.deletedFiles.splice(fileIndex, 1);
          deletedFiles.push(DeleteFile);
          const params = {
            Bucket: this.configService.get('S3_BUCKET_NAME'),
            Key: DeleteFile.id,
          };
          await this.s3Client.deleteObject(params).promise();
        }
      } else {
        for (const fileId of fileIds) {
          const fileIndex = user.files.findIndex(
            (file: any) => file.id === fileId,
          );
          if (fileIndex === -1) {
            throw new NotFoundException('File does not exist');
          }
          const DeleteFile = user.files[fileIndex];
          user.files.splice(fileIndex, 1);
          user.deletedFiles.push(DeleteFile);
          deletedFiles.push(DeleteFile);
        }
      }
      await user.save();
      return deletedFiles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove files: ',error.message);
    }
  }
}

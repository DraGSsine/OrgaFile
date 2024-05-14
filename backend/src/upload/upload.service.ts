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
import { AnalyzeFile } from 'src/ai/openai-setup';
import * as crypto from 'crypto';
import { uploadFiles } from 'src/helpers/uploadFiles';
import { FileDocument, FileInfo } from 'src/schemas/files.schema';
import { User, userDocument } from 'src/schemas/auth.schema';
import {
  RemovedFiles,
  RemovedFilesDocument,
} from 'src/schemas/removedFiles.schema';
@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('RemovedFile')
    private readonly removedFilesModel: Model<RemovedFilesDocument>,
    @InjectModel('File') private readonly fileModel: Model<FileDocument>,
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {}
  private readonly s3Client = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('S3_REGION'),
  });

  async uploadFiles(files: Array<Express.Multer.File>, userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const fileDocuments = await uploadFiles(
        files,
        userId,
        this.fileModel,
        this.s3Client,
      );
      return fileDocuments;
    } catch (error) {
      if (error.code === 'UnsupportedMediaType') {
        throw new UnsupportedMediaTypeException();
      } else {
        throw error;
      }
    }
  }

  async restoreFile(req: any, fileId: string) {
    try {
      const userId = req.user.userId;
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const removedFiles = await this.removedFilesModel.find({ userId });

      await this.fileModel.findOneAndUpdate(
        { userId },
        { files: removedFiles },
      );
      return 'files restored successfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to restore files');
    }
  }

  async loadFiles(userId: ObjectId) {
    try {
      const files = await this.fileModel.findOne({ userId });
      if (!files) {
        throw new NotFoundException('Files not found');
      }
      return files.files;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async loadRecentFiles(userId: ObjectId) {
    try {
      // load the last 10 files if ther's less than 10 lead them
      const files = await this.fileModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(10);
      if (!files) {
        throw new NotFoundException('Files not found');
      }
      return files;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async loadRemovedFiles(userId: ObjectId) {
    try {
      const removedFiles = await this.removedFilesModel.find({ userId });
      return removedFiles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load files');
    }
  }

  async remove(req: any, fileId: string, isPermanently: boolean) {
    try {
      // Find the user by ID
      const user = await this.userModel.findById(req.user.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (isPermanently) {
        // Remove the file from removedFilesModel
        const removeResult = await this.removedFilesModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId } } },
        );

        if (removeResult.modifiedCount === 0) {
          throw new NotFoundException('File not found in removed files');
        }

        // Delete the file from S3
        const fileKey = `${req.user.userId}/${fileId}`;
        const deleteParams = {
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Key: fileKey,
        };

        await this.s3Client.deleteObject(deleteParams).promise();

        return 'File deleted permanently';
      } else {
        const file = await this.fileModel.findOne({
          userId: req.user.userId,
          'files.fileId': fileId,
        });

        if (!file) {
          throw new NotFoundException('File not found');
        }

        await this.fileModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId } } },
        );
        const removedFile = file.files.find((file) => file.fileId === fileId);

        const doc = await this.removedFilesModel.findOneAndUpdate(
          { userId: req.user.userId },
          { $push: { files: removedFile } },
          { upsert: true, new: true },
        );

        // If the document was newly created, handle it here
        if (!doc) {
          console.log('New document created.');
        } else {
          console.log('Document found and updated.');
        }

        return removedFile;
      }
    } catch (error) {
      console.error('Error removing file:', error);
      throw new InternalServerErrorException('Failed to remove file');
    }
  }

  async removeMany(req: any, fileIds: string[], isPremanently: boolean) {
    try {
      const user = await this.userModel.findById(req.user.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (isPremanently) {
        const removeResult = await this.removedFilesModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId: { $in: fileIds } } } },
        );

        if (removeResult.modifiedCount === 0) {
          throw new NotFoundException('Files not found in removed files');
        }

        const deleteParams = {
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Delete: {
            Objects: fileIds.map((fileId) => ({
              Key: `${req.user.userId}/${fileId}`,
            })),
          },
        };

        await this.s3Client.deleteObjects(deleteParams).promise();

        return 'Files deleted permanently';
      } else {
        const files = await this.fileModel.find({
          userId: req.user.userId,
          'files.fileId': { $in: fileIds },
        });

        if (!files) {
          throw new NotFoundException('Files not found');
        }

        await this.fileModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId: { $in: fileIds } } } },
        );

        const removedFiles = files.map((file) =>
          file.files.filter((file) => fileIds.includes(file.fileId)),
        );

        const doc = await this.removedFilesModel.findOneAndUpdate(
          { userId: req.user.userId },
          { $push: { files: { $each: removedFiles } } },
          { upsert: true, new: true },
        );

        if (!doc) {
          console.log('New document created.');
        } else {
          console.log('Document found and updated.');
        }

        return removedFiles;
      }
    } catch (error) {
      console.error('Error removing files:', error);
      throw new InternalServerErrorException('Failed to remove files');
    }
  }
}

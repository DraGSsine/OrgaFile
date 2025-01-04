import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnsupportedMediaTypeException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { uploadFiles } from "../helpers/uploadFiles";
import { FileDocument } from "../schemas/files.schema";
import { UserDocument } from "../schemas/auth.schema";
import { RemovedFilesDocument } from "../schemas/removedFiles.schema";
import { FolderDocument } from "../schemas/folders.schema";
import { Readable } from "stream";
import { FileMetaData, FilesWithMode } from "../types/type";

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel("RemovedFile")
    private readonly removedFilesModel: Model<RemovedFilesDocument>,
    @InjectModel("File") private readonly fileModel: Model<FileDocument>,
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    @InjectModel("Folder") private readonly folderModel: Model<FolderDocument>
  ) {}
  private readonly s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFiles(files: FilesWithMode, userId: ObjectId) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw new Error("User not found");

      const fileSize = files.files.reduce((acc, file) => acc + file.size, 0);
      const totalStorageGb = (fileSize + user.storageUsed) / 1024 ** 3;

      if (totalStorageGb > user.storage)
        throw new Error("Storage limit exceeded");
      if (user.creditsUsed + files.files.length > user.creditsLimit)
        throw new Error("Request limit exceeded");

      const fileDocuments = await uploadFiles(
        files,
        userId,
        this.fileModel,
        this.folderModel
      );

      await this.userModel.updateOne(
        { _id: userId },
        {
          $inc: {
            storageUsed: fileSize,
            creditsUsed: files.files.length,
          },
        }
      );
      return fileDocuments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async restoreFile(req: any, fileId: string) {
    try {
      const file = await this.removedFilesModel.findOne({
        userId: req.user.userId,
        "files.fileId": fileId,
      });

      if (!file) {
        throw new NotFoundException("File not found");
      }

      await this.removedFilesModel.updateOne(
        { userId: req.user.userId },
        { $pull: { files: { fileId } } }
      );

      const restoredFile = file.files.find((file) => file.fileId === fileId);

      await this.fileModel.findOneAndUpdate(
        { userId: req.user.userId },
        { $push: { files: restoredFile } },
        { upsert: true, new: true }
      );
      return restoredFile;
    } catch (error) {
      console.error("Error restoring file:", error);
      throw new InternalServerErrorException("Failed to restore file");
    }
  }

  async loadFiles(userId: ObjectId) {
    try {
      const files = await this.fileModel.findOne({ userId });
      if (!files) {
        return [];
      }
      return files.files;
    } catch (error) {
      throw new InternalServerErrorException("Failed to load files");
    }
  }

  async loadRecentFiles(userId: ObjectId) {
    try {
      const userFiles = await this.fileModel
        .findOne({ userId })
        .sort({ "files.createdAt": -1 });
      if (!userFiles) {
        return [];
      }

      const res = userFiles.files
        .slice()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 8);

      return res;
    } catch (error) {
      throw new InternalServerErrorException("Failed to load files");
    }
  }

  async loadRemovedFiles(userId: ObjectId) {
    try {
      const files = await this.removedFilesModel.findOne({ userId });
      if (!files) {
        return [];
      }
      return files.files;
    } catch (error) {
      throw new InternalServerErrorException("Failed to load files");
    }
  }

  async remove(req: any, fileId: string, isPermanently: boolean) {
    try {
      const user = await this.userModel.findById(req.user.userId);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      // Find the user by ID
      const userFiles = await this.removedFilesModel.findOne({
        userId: req.user.userId,
        "files.fileId": fileId,
      });
      // Remove the file from removedFilesModel
      if (isPermanently) {
        const removeResult = await this.removedFilesModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId } } }
        );

        if (removeResult.modifiedCount === 0) {
          throw new NotFoundException("File not found in removed files");
        }

        // Delete the file from S3
        const fileKey = `${req.user.userId}/${fileId}`;
        const deleteParams = {
          Bucket: this.configService.get("S3_BUCKET_NAME"),
          Key: fileKey,
        };

        // Update the user's storageUsed property
        const size = userFiles.files.find(
          (file) => file.fileId === fileId
        ).size;
        user.storageUsed -= size;
        // Remove the file from the folder and identify the folder
        const folderUpdateResult = await this.folderModel.updateOne(
          { userId: req.user.userId, "folders.files.fileId": fileId },
          { $pull: { "folders.$.files": { fileId } } }
        );
        
        if (folderUpdateResult.modifiedCount > 0) {
          // Check if the folder has 0 files and remove it if true
          await this.folderModel.updateOne(
            { userId: req.user.userId },
            { $pull: { folders: { files: { $size: 0 } } } }
          );
        }
        
        await user.save();
        await user.save();
        const command = new DeleteObjectCommand(deleteParams);
        await this.s3Client.send(command)
        return "File deleted permanently";
      } else {
        const file = await this.fileModel.findOne({
          userId: req.user.userId,
          "files.fileId": fileId,
        });

        if (!file) {
          throw new NotFoundException("File not found");
        }

        await this.fileModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId } } }
        );
        const removedFile = file.files.find((file) => file.fileId === fileId);

        await this.removedFilesModel.findOneAndUpdate(
          { userId: req.user.userId },
          { $push: { files: removedFile } },
          { upsert: true, new: true }
        );
        return removedFile;
      }
    } catch (error) {
      console.error("Error removing file:", error);
      throw new InternalServerErrorException("Failed to remove file");
    }
  }

  async removeMany(req: any, fileIds: string[], isPermanently: boolean) {
    try {
      if (isPermanently) {
        const files = await this.removedFilesModel.findOne({
          userId: req.user.userId,
          "files.fileId": { $in: fileIds },
        });

        if (!files) {
          throw new NotFoundException("Files not found in removed files");
        }

        // calculate the size of the files to be removed exmaples of size 0.004 g

        const removedFilesSize = files.files
          .filter((file) => {
            const isIncluded = fileIds.includes(file.fileId);
            return isIncluded;
          })
          .reduce((acc, file) => {
            return acc + file.size;
          }, 0);

        const removeResult = await this.removedFilesModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId: { $in: fileIds } } } }
        );

        if (removeResult.modifiedCount === 0) {
          throw new NotFoundException("Files not found in removed files");
        }

        // remove files from folder

        const folderUpdateResult = await this.folderModel.updateOne(
          { userId: req.user.userId },
          {
            $pull: {
              folders: { files: { $elemMatch: { fileId: { $in: fileIds } } } },
            },
          }
        );

        if (folderUpdateResult.modifiedCount > 0) {
          await this.folderModel.updateOne(
            { userId: req.user.userId },
            { $pull: { folders: { files: { $size: 0 } } } }
          );
        }

        const deleteParams = {
          Bucket: this.configService.get("S3_BUCKET_NAME"),
          Delete: {
            Objects: fileIds.map((fileId) => ({
              Key: `${req.user.userId}/${fileId}`,
            })),
          },
        };

        const user = await this.userModel.findById(req.user.userId);
        const updatedStorage = user.storageUsed - removedFilesSize;
        if (updatedStorage < 0) {
          user.storageUsed = 0;
        } else {
          user.storageUsed = updatedStorage;
        }
        await user.save();
        const command = new DeleteObjectsCommand(deleteParams);
        await this.s3Client.send(command)

        return "Files deleted permanently";
      } else {
        const files = await this.fileModel.findOne({
          userId: req.user.userId,
          "files.fileId": { $in: fileIds },
        });

        if (!files) {
          console.log("Files not found");
          return
        }

        await this.fileModel.updateOne(
          { userId: req.user.userId },
          { $pull: { files: { fileId: { $in: fileIds } } } }
        );

        const removedFiles = files.files.filter((file) =>
          fileIds.includes(file.fileId)
        );
        const flattenedRemovedFiles = removedFiles.flat();

        await this.removedFilesModel.findOneAndUpdate(
          { userId: req.user.userId },
          { $push: { files: { $each: flattenedRemovedFiles } } },
          { upsert: true, new: true }
        );
        return flattenedRemovedFiles;
      }
    } catch (error) {
      console.error("Error removing files:", error);
      throw new InternalServerErrorException("Failed to remove files");
    }
  }

  async downloadFile(
    req: any,
    fileId: string
  ): Promise<{ fileStream: any; fileName: string; fileSize: number }> {
    try {
      const file = await this.fileModel.findOne({
        userId: req.user.userId,
        "files.fileId": fileId,
      });

      if (!file) {
        throw new NotFoundException("File not found");
      }

      const { name } = file.files.find((file) => file.fileId === fileId);

      const fileKey = `${req.user.userId}/${fileId}`;
      const downloadParams = {
        Bucket: this.configService.get("S3_BUCKET_NAME"),
        Key: fileKey,
      };
      console.log(downloadParams);
      // Get the file metadata to retrieve the file size
      const headCommand = new HeadObjectCommand(downloadParams);
      const headResult = await this.s3Client.send(headCommand);
      const fileSize = headResult.ContentLength;
      // Get the file stream
      const downloadCommand = new GetObjectCommand(downloadParams);
      const fileStream = (await this.s3Client.send(downloadCommand)).Body

      return { fileStream, fileName: name, fileSize };
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new InternalServerErrorException("Failed to download file");
    }
  }
}

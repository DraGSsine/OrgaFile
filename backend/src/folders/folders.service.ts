import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import * as admZip from "adm-zip";
import { FolderDocument } from "../schemas/folders.schema";
import { FileDocument, FileInfo } from "../schemas/files.schema";
import { ConfigService } from "@nestjs/config";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { RemovedFilesDocument } from "src/schemas/removedFiles.schema";

@Injectable()
export class FoldersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel("RemovedFile")
    private readonly removedFilesModel: Model<RemovedFilesDocument>,
    @InjectModel("File") private readonly fileModel: Model<FileDocument>,
    @InjectModel("Folder") private readonly folderModel: Model<FolderDocument>
  ) {}
  private readonly s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  async loadFolders(userId: string) {
    try {
      const foldersData = await this.folderModel
        .find({ userId })
        .select("folders")
        .lean();

      const folders = foldersData.map((doc: any) => doc.folders).flat();
      return folders;
    } catch (error) {
      throw new InternalServerErrorException("Failed to load folders");
    }
  }
  async loadOneFolder(folderId: ObjectId, userId: string) {
    try {
      const userFolders = await this.folderModel.findOne({ userId });
      if (!userFolders) {
        throw new NotFoundException("Folder not found");
      }
      const folder = userFolders.folders.find(
        (folder) => folder.folderId == folderId
      );
      if (!folder) {
        throw new NotFoundException("Folder not found");
      }
      return folder;
    } catch (error) {
      throw new InternalServerErrorException("Failed to load folder");
    }
  }

  async downloadFolder(folderId: ObjectId, userId: string) {
    try {
      const userFolders = await this.folderModel.findOne({ userId });
      if (!userFolders) {
        throw new NotFoundException("Folder not found");
      }

      // Find specific folder
      const folder = userFolders.folders.find(
        (f) => f.folderId.toString() === folderId.toString()
      );

      if (!folder) {
        throw new NotFoundException("Specific folder not found");
      }

      const zip = new admZip();

      for (const file of folder.files) {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${userId}/${file.fileId}`,
        });

        const signedUrl = await getSignedUrl(this.s3Client, command, {
          expiresIn: 60,
        });
        const response = await fetch(signedUrl);
        const arrayBuffer = await response.arrayBuffer();

        zip.addFile(`${file.name}.${file.format}`, Buffer.from(arrayBuffer));
      }

      const zipBuffer = zip.toBuffer();
      const base64Zip = zipBuffer.toString("base64");

      return base64Zip;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Failed to download folder",
        error.message
      );
    }
  }

  async deleteFolder(folderId: ObjectId, userId: string) {
    try {
      const userFolders = await this.folderModel.findOne({ userId });
      if (!userFolders) {
        throw new NotFoundException("Folder not found");
      }
      const filesIdInFolder = userFolders.folders
        .find((f) => f.folderId.toString() === folderId.toString())
        .files.map((file) => file.fileId);

      console.log("------->", filesIdInFolder);
      const updatedFolders = userFolders.folders.filter(
        (f) => f.folderId.toString() !== folderId.toString()
      );
      userFolders.folders = updatedFolders;
      // remove all the files in the folder from the transh and the files collection
      await this.removedFilesModel.updateMany(
        { userId },
        { $pull: { files: { fileId: { $in: filesIdInFolder } } } }
      );

      // remove files from files collection

      await this.fileModel.updateMany(
        { userId },
        { $pull: { files: { fileId: { $in: filesIdInFolder } } } }
      );

      // remove files from s3
      for (const file of filesIdInFolder) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `${userId}/${file}`,
        });
        await this.s3Client.send(command);
      }

      await userFolders.save();
      return "Folder deleted successfully";
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to delete folder");
    }
  }
}

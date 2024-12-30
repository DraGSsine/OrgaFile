import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import * as admZip from "adm-zip";
import { FolderDocument } from "../schemas/folders.schema";
import { FileInfo } from "../schemas/files.schema";
import { ConfigService } from "@nestjs/config";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class FoldersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel("Folder") private readonly folderModel: Model<FolderDocument>
  ) {}
  private readonly s3Client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
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

      // Download and add files to zip
      const downloadFiles = await this.getFilesInFolder(folder.files);

      for (const file of downloadFiles) {
        zip.addFile(file.name, file.content);
      }

      // Convert to Base64
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

  async getFilesInFolder(
    files: FileInfo[]
  ): Promise<{ name: string; content: Buffer }[]> {
    const data = [];

    for (const file of files) {
      try {
        const { bucket, key } = this.parseS3Url(file.url);

        // Retrieve file from S3
        const command = new GetObjectCommand({ Bucket: bucket, Key: key });
        const response = await this.s3Client.send(command)

        data.push({
          name: `${file.name}.${file.format}`,
          content: response.Body,
        });
      } catch (error) {
        console.error(
          `Failed to fetch file: ${file.name}, error: ${error.message}`
        );
      }
    }

    return data;
  }

  private parseS3Url(url: string): { bucket: string; key: string } {
    const cleanUrl = url.replace(/^\/\//, "https://");

    const urlPattern = /https:\/\/([^.]+\.s3\.amazonaws\.com)\/([^/]+)\/(.*)/;
    const match = cleanUrl.match(urlPattern);

    if (!match) {
      throw new Error(`Invalid S3 URL format: ${url}`);
    }

    return {
      bucket: match[1].replace(".s3.amazonaws.com", ""),
      key: match[2] + "/" + match[3],
    };
  }
}

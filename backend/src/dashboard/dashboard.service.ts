import { InjectModel } from "@nestjs/mongoose";
import { FoldersModule } from "../folders/folders.module";
import { FolderDocument } from "../schemas/folders.schema";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/files.schema";
import { UserDocument } from "../schemas/auth.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
@Injectable()
export class DashboardService {
  constructor(
    @InjectModel("File") private readonly fileModel: Model<FileDocument>,
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    @InjectModel("Folder") private readonly folderModel: Model<FolderDocument>
  ) {}
  async recentFolders(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    try {
      /*
      folderModle = [{
        userId: "123",
        folders:[
          {
            folderId: "fdf",
            name: "folder1",
          }
        ]
      }]

      */

      const folders = await this.folderModel.findOne(
        { userId: userId },
        { folders: { $slice: -5 } }
      );
      return folders
    } catch (error) {
      throw error;
    }
  }

  async loadUserLimits(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return {
        storageLimit: user.storage,
        storageUsed: user.storageUsed,
        creditsLimit: user.creditsLimit,
        creditsUsed: user.creditsUsed,
      };
    } catch (error) {
      throw error;
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as admZip from 'adm-zip';
import { FolderDocument } from 'src/schemas/folders.schema';
import { FileInfo } from 'src/schemas/files.schema';

type FileContent = {
  name: string;
  content: ArrayBuffer;
};

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('Folder') private readonly folderModel: Model<FolderDocument>,
  ) {}
  async loadFolders(userId: string) {
    try {
      const foldersData = await this.folderModel
        .find({ userId })
        .select('folders')
        .lean();

      const folders = foldersData.map((doc: any) => doc.folders).flat();
      return folders;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load folders');
    }
  }
  async loadOneFolder(folderId: ObjectId, userId: string) {
    try {
      const userFolders = await this.folderModel.findOne({ userId });
      if (!userFolders) {
        throw new NotFoundException('Folder not found');
      }
      const folder = userFolders.folders.find(
        (folder) => folder.folderId == folderId,
      );
      if (!folder) {
        throw new NotFoundException('Folder not found');
      }
      return folder;
    } catch (error) {
      throw new InternalServerErrorException('Failed to load folder');
    }
  }

  async downloadFolder(folderId: ObjectId, userId: string) {
    try {
      const userFolders = await this.folderModel.findOne({ userId });
      if (!userFolders) {
        throw new NotFoundException('Folder not found');
      }
      const folder = userFolders.folders.find(
        (folder) => folder.folderId == folderId,
      );
      const zip = new admZip();
      const downloadFiles = await this.getFilesInFolder(folder.files);

      downloadFiles.forEach((download) => {
        const base64Content = Buffer.from(download.content).toString('base64');
        zip.addFile(download.name, Buffer.from(base64Content, 'base64'));
      });

      const archive = zip.toBuffer();
      return archive;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to download folder',
        error,
      );
    }
  }

  private async getFilesInFolder(files: FileInfo[]): Promise<FileContent[]> {
    const data = [];
    for (const file of files) {
      try {
        const response = await fetch(file.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fileContent = await response.arrayBuffer(); // Use response.arrayBuffer() instead of response.text()
        data.push({ name: file.name, content: fileContent });
      } catch (error) {
        console.error(`Failed to fetch file: ${file.name}, error: ${error}`);
      }
    }
    return data;
  }
}

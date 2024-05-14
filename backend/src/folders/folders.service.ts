// import {
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
//   StreamableFile,
// } from '@nestjs/common';
// import { CreateFolderDto } from './dto/create-folder.dto';
// import { UpdateFolderDto } from './dto/update-folder.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Files, userDocument } from 'src/schemas/auth.schema';
// import * as admZip from 'adm-zip';

// type FileContent = {
//   name: string;
//   content: ArrayBuffer;
// };

// @Injectable()
// export class FoldersService {
//   constructor(
//     @InjectModel('user') private readonly userModel: Model<userDocument>,
//   ) {}
//   async loadFolders(userId: string) {
//     try {
//       const user = await this.userModel.findById(userId);
//       if (!user) {
//         throw new NotFoundException('User not found');
//       }
//       return user.folders;
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to load folders');
//     }
//   }
//   async loadOneFolder(folderId: string, userId: string) {
//     try {
//       const user = await this.userModel.findById(userId);
//       if (!user) {
//         throw new NotFoundException('User not found');
//       }

//       const folder = user.folders.find((folder) => folder.id == folderId);
//       if (!folder) {
//         throw new NotFoundException('Folder not found');
//       }
//       return folder;
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to load folder');
//     }
//   }

//   async downloadFolder(folderId: string, userId: string) {
//     try {
//       const user = await this.userModel.findById(userId);
//       if (!user) {
//         throw new NotFoundException('User not found');
//       }

//       const folder = user.folders.find((folder) => folder.id == folderId);
//       if (!folder) {
//         throw new NotFoundException('Folder not found');
//       }

//       const zip = new admZip();
//       const downloadFiles = await this.getFilesInFolder(folder.files);

//       downloadFiles.forEach((download) => {
//         const base64Content = Buffer.from(download.content).toString('base64');
//         zip.addFile(download.name, Buffer.from(base64Content, 'base64'));
//       });

//       const archive = zip.toBuffer();
//       return archive;
//     } catch (error) {
//       console.error(error);
//       throw new InternalServerErrorException(
//         'Failed to download folder',
//         error,
//       );
//     }
//   }

//   private async getFilesInFolder(files: Files[]): Promise<FileContent[]> {
//     const data = [];
//     for (const file of files) {
//       try {
//         const response = await fetch(file.url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const fileContent = await response.arrayBuffer(); // Use response.arrayBuffer() instead of response.text()
//         data.push({ name: file.name, content: fileContent });
//       } catch (error) {
//         console.error(`Failed to fetch file: ${file.name}, error: ${error}`);
//       }
//     }
//     return data;
//   }
// }

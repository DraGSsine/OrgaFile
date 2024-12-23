import { Model, ObjectId } from 'mongoose';
import AWS from 'aws-sdk';
import { FileDocument } from '../schemas/files.schema';
import { FolderDocument } from '../schemas/folders.schema';
export declare const uploadFiles: (files: Array<Express.Multer.File>, userId: ObjectId, fileModel: Model<FileDocument>, folderModel: Model<FolderDocument>, s3Client: AWS.S3) => Promise<void>;

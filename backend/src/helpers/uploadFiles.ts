import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Model, ObjectId, Types } from 'mongoose';
import * as crypto from 'crypto';
import {
  analyzeDocument,
  generateFileName,
  categorizeDocuments,
} from '../ai/openai-setup';
import AWS from 'aws-sdk';
import { FileDocument, FileInfo } from '../schemas/files.schema';
import { FolderDocument } from '../schemas/folders.schema';
import { AiRespone, FolderInfoType } from 'src/types/type';
import { convertToGb } from './sizeConverter';

const getAllCategoryNames = async (folders: FolderDocument[]) => {
  const categories = [];
  for (const folder of folders) {
    for (const category of folder.folders) {
      categories.push(category.name);
    }
  }
  return categories;
};

export const uploadFiles = async (
  files: Array<Express.Multer.File>,
  userId: ObjectId,
  fileModel: Model<FileDocument>,
  folderModel: Model<FolderDocument>,
  s3Client: AWS.S3,
) => {
  try {
    const fileData = [];
    const getAllCategories = [];

    // Retrieve all folders categories from MongoDB
    const db_folders = await folderModel.find({ userId });
    const allCategories = await getAllCategoryNames(db_folders);
    getAllCategories.push(...allCategories);

    // Upload files to S3 and collect their metadata
    const uploadPromises = files.map(async (file: Express.Multer.File) => {
      // Analyze file to determine its content and topic
      const documentInfo = await analyzeDocument(file);

      const newFileName = await generateFileName(documentInfo);

      const nameKey = `${crypto.randomBytes(16).toString('hex')}-${newFileName}`;
      const fileExtension = file.originalname.split('.').pop();
      const urlend = `${userId}/${nameKey}.${fileExtension}`;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: urlend,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload file to S3
      await s3Client.upload(params).promise();

      const data: FileInfo = {
        fileId: `${nameKey}.${fileExtension}`,
        topic: documentInfo.mainTopic,
        url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${urlend}`,
        format: file.originalname.split('.').pop(),
        name: newFileName,
        size: convertToGb(file.size),
        createdAt: new Date(),
        documentType: documentInfo.documentType,
        keyEntities: documentInfo.keyEntities,
        summary: documentInfo.summary,
      };
      fileData.push(data);
    });

    // Wait for all uploads and metadata processing to finish
    await Promise.all(uploadPromises);
    // Insert uploaded file metadata into MongoDB
    await fileModel.findOneAndUpdate(
      { userId },
      { $push: { files: { $each: fileData } } },
      { upsert: true },
    );
    // Organize files into folders based on enhanced categorization
    const categorizationResult: AiRespone[] = await categorizeDocuments(
      fileData.map((file) => ({
        mainTopic: file.topic,
        documentType: file.documentType,
        keyEntities: file.keyEntities,
        summary: file.summary,
      })),
      getAllCategories,
    );
    console.log('-----------------------------------------');
    console.log('Categorization result:', categorizationResult);
    console.log('-----------------------------------------');
    // Process the categorization result
    const folderData: FolderInfoType[] = categorizationResult.map((cat) => {
      const filesInCategory = fileData.filter(
        (file) => file.topic === cat.originalDocument.mainTopic,
      );
      return {
        folderId: new Types.ObjectId(),
        name: cat.category,
        files: filesInCategory,
      };
    });

    // Update or create folders in the database
    for (const folder of folderData) {
      // Check if the folder exists for the user
      const existingFolder = await folderModel.findOne({
        userId,
        'folders.name': folder.name,
      });

      if (existingFolder) {
        // Folder exists, update its files
        await folderModel.findOneAndUpdate(
          { userId, 'folders.name': folder.name },
          {
            $push: { 'folders.$.files': { $each: folder.files } },
          },
        );
      } else {
        // Folder does not exist, create a new document
        await folderModel.findOneAndUpdate(
          { userId },
          { $push: { folders: folder } },
          { upsert: true },
        );
      }
    }
  } catch (error) {
    if (error.code === 'UnsupportedMediaType') {
      throw new UnsupportedMediaTypeException();
    } else {
      throw error;
    }
  }
};

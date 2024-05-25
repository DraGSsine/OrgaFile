import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Model, ObjectId, Types } from 'mongoose';
import * as crypto from 'crypto';
import { analyzeDocument, organizeFilesAnalysis } from 'src/ai/openai-setup';
import AWS from 'aws-sdk';
import { File, FileDocument, FileInfo } from 'src/schemas/files.schema';
import { FolderDocument, FolderInfo } from 'src/schemas/folders.schema';

const addFileToCategoryBasedOnTopic = (
  categories: any,
  files: FileInfo[],
): FolderInfo[] => {
  const folders = [];

  for (const category of categories) {
    const filesInCategory = files.filter((file) =>
      category.topics.includes(file.topic),
    );
    folders.push({
      folderId: new Types.ObjectId(),
      name: category.name,
      files: filesInCategory,
      numberOfFiles: filesInCategory.length,
    });
  }
  return folders;
};

const extractTopicsFromFiles = async (files: FileInfo[]) => {
  return files.map((file) => file.topic);
};

const organizeFiles = async (files: FileInfo[], getAllCategories: string[]) => {
  const topics = await extractTopicsFromFiles(files);
  return await organizeFilesAnalysis(topics, getAllCategories);
};

async function getAllCategoryNames(db_folders: any) {
  try {
    // Extract the category names using the map() function
    const categoryNames = db_folders
      .flatMap((doc) => doc.folders.map((folder) => folder.name))
      .filter((name) => name !== null && name !== undefined);

    return categoryNames;
  } catch (error) {
    console.error('Error retrieving category names:', error);
    throw error;
  }
}

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
    console.log('All categories:', allCategories);
    getAllCategories.push(...allCategories);
    // Upload files to S3 and collect their metadata
    const uploadPromises = files.map(async (file:Express.Multer.File) => {
      const nameKey = `${crypto.randomBytes(16).toString('hex')}-${file.originalname}`;
      const params = {
        mimetype: file.mimetype,
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${userId}/${nameKey}`,
        Body: file.buffer,
      };

      // Upload file to S3
      await s3Client.upload(params).promise();

      // Prepare file metadata
      const data: FileInfo = {
        fileId: nameKey,
        topic: 'general', // Default topic
        url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${userId}/${nameKey}`,
        format: file.originalname.split('.').pop(),
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
      };

      // Analyze file to determine its topic
      const topic = await analyzeDocument(file);
      console.log('Topic:', topic);
      data.topic = topic;

      // Push file metadata to array
      fileData.push(data);
    });

    // Wait for all uploads and metadata processing to finish
    await Promise.all(uploadPromises);
    console.log("Done uploading files")
    // Insert uploaded file metadata into MongoDB
    await fileModel.findOneAndUpdate(
      { userId },
      { $push: { files: { $each: fileData } } },
      { upsert: true },
    );
    // Organize files into folders based on topics
    const res = await organizeFiles(fileData, []);
    // console.log(res);
    const folderData: FolderInfo[] = addFileToCategoryBasedOnTopic(
      res,
      fileData,
    );
    for (const folder of folderData) {
      // Check if the folder exists for the user
      const existingFolder = await folderModel.findOne({ userId, "folders.name": folder.name });
    
      if (existingFolder) {
        // Folder exists, update its files
        await folderModel.findOneAndUpdate(
          { userId, "folders.name": folder.name },
          { $push: { "folders.$.files": { $each: folder.files } } }
        );
      } else {
        // Folder does not exist, create a new document
        await folderModel.findOneAndUpdate(
          { userId },
          { $push: { folders: folder } },
          { upsert: true }
        );
      }
    }
    

    // console.log('Folders:', folderData);
  } catch (error) {
    if (error.code === 'UnsupportedMediaType') {
      throw new UnsupportedMediaTypeException();
    } else {
      throw error;
    }
  }
};

import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import * as crypto from 'crypto';
import { AnalyzeFile, organizeFilesAnalysis } from 'src/ai/openai-setup';
import AWS from 'aws-sdk';
import { File, FileDocument, FileInfo } from 'src/schemas/files.schema';
import { Folder } from 'src/schemas/folders.schema';

const addFileToCategoryBasedOnTopic = (categories: any, files: FileInfo[]) => {
  const folders = [];

  for (const category of categories) {
    const filesInCategory = files.filter((file) =>
      category.topics.includes(file.topic),
    );
    folders.push({
      id: crypto.randomBytes(16).toString('hex'),
      name: category.name,
      topics: category.topics,
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
  s3Client: AWS.S3,
) => {
  try {
    const fileData = [];
    // const db_folders: Folder[] = await userModel.find({}, 'folders');
    // const getAllCategories = await getAllCategoryNames(db_folders);
    const uploadPromises = files.map(async (file) => {
      const nameKey = crypto.randomBytes(16).toString('hex');
      const type = file.mimetype.split('/').pop();
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${userId}/${nameKey}`,
        Body: file.buffer,
      };

      await s3Client.upload(params).promise();
      const data: FileInfo = {
        fileId: nameKey,
        topic: 'general',
        url: `${process.env.S3_BUCKET_URL}${nameKey}`,
        format: file.originalname.split('.').pop(),
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
      };

      const topic = ' await AnalyzeFile(data, type)';
      data.topic = topic;
      fileData.push(data);
    });
    await Promise.all(uploadPromises);
    // const res = await organizeFiles(fileData, getAllCategories);
    // const folder = addFileToCategoryBasedOnTopic(res, fileData);

    // folder.forEach(async (folder) => {
    //   const folderToUpdate = await userModel.findOne({
    //     _id: userId,
    //     'folders.name': folder.name,
    //   });
    //   console.log(folderToUpdate);
    // });

    const doc = await fileModel.findOneAndUpdate(
      { userId: userId },
      { $push: { files: { $each: fileData } } },
      { upsert: true, new: true },
    );
    return doc;
  } catch (error) {
    if (error.code === 'UnsupportedMediaType') {
      throw new UnsupportedMediaTypeException();
    } else {
      throw error;
    }
  }
};

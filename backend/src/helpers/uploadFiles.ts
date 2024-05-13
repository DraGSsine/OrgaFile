import { UnsupportedMediaTypeException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Files } from 'src/schemas/auth.schema';
import * as crypto from 'crypto';
import { AnalyzeFile, organizeFilesAnalysis } from 'src/ai/openai-setup';
import AWS from 'aws-sdk';

const addFileToCategoryBasedOnTopic = (categories: any, files: Files[]) => {
  const folders = [];

  for (const category of categories) {
    const filesInCategory = files.filter((file) => category.topics.includes(file.topic));
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

const extractTopicsFromFiles = async (files: Files[]) => {
  return files.map((file) => file.topic);
};

const organizeFiles = async (files: Files[]) => {
  const topics = await extractTopicsFromFiles(files);
  return await organizeFilesAnalysis(topics);
};

export const uploadFiles = async (
  files: Array<Express.Multer.File>,
  userId: ObjectId,
  s3Client: AWS.S3,
  userModel: any,
) => {
  try {
    const fileData = [];
    const uploadPromises = files.map(async (file) => {
      const nameKey = `${file.originalname}-${crypto.randomBytes(16).toString('hex')}`;
      const type = file.mimetype.split('/').pop();
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: nameKey,
        Body: file.buffer,
      };

      await s3Client.upload(params).promise();
      const data = {
        id: nameKey,
        topic: 'general',
        url: `${process.env.S3_BUCKET_URL}${nameKey}`,
        format: file.originalname.split('.').pop(),
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
      };

      const topic = await AnalyzeFile(data, type);
      data.topic = topic;
      fileData.push(data);
    });

    await Promise.all(uploadPromises);
    // const res = await organizeFiles(fileData);
    // const folder = addFileToCategoryBasedOnTopic(res, fileData);
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        files: { $each: fileData },
        // folders: { $each: folder },
      },
    });

    return "folder";
  } catch (error) {
    if (error.code === 'UnsupportedMediaType') {
      throw new UnsupportedMediaTypeException();
    } else {
      throw error;
    }
  }
};

import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly s3Client = new AWS.S3({
    region: this.configService.get('S3_REGION'),
    accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
  });
  constructor(private readonly configService: ConfigService) {}
  async UploadFiles(file: any) {
    const { originalname, buffer } = file;
    try {
      return await this.s3Client
        .upload({
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Key: originalname,
          Body: buffer,
        })
        .promise();
    } catch (error) {
      throw new UnsupportedMediaTypeException();
    }
  }

  async LoadFiles() {
    try {
      const data = await this.s3Client
        .listObjectsV2({
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          MaxKeys: 1000,
        })
        .promise();

      // const detailedFiles = data.Contents.map((file) => ({
      //   key: file.Key,
      //   size: file.Size,
      //   lastModified: file.LastModified,
      //   format: file.Key.split('.').pop(),
      // }));

      return data;
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}

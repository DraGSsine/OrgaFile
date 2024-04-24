import {
  Injectable,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { fileType, userDocument } from 'src/schemas/auth.schema';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}
  private readonly s3Client = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('S3_REGION'),
  });
  async UploadFiles(file: Express.Multer.File, userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    console.log(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const params = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: file.originalname,
        Body: file.buffer,
      };

      await this.s3Client.upload(params).promise();

      const data:fileType = {
        url: `${this.configService.get('S3_BUCKET_URL')}${file.originalname}`,
        format: file.originalname.split('.').pop(),
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
  
      };
      user.files.push(data);
      await user.save();

      return user;
    } catch (error) {
      if (error.code === 'UnsupportedMediaType') {
        throw new UnsupportedMediaTypeException();
      } else {
        throw error;
      }
    }
  }

  async LoadFiles(userId: ObjectId) {
    try {
      const files = await this.userModel.findById(userId);
      if (!files) {
        throw new NotFoundException('User not found');
      }
      return files.files;
    } catch (error) {
      throw new UnsupportedMediaTypeException();
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

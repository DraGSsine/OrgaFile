import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { v2 as cloudinary, v2 } from 'cloudinary';
const streamifier = require('streamifier');
@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'decb9vsza',
      api_key: '618554148233887',
      api_secret: 'WLlUD0LH606jbzprAFreICQW06k',
    });
  }
  async UploadFiles(file: any) {
    return new Promise((resolve, reject) => {
      console.log(file);
      const uploadStream = cloudinary.uploader.upload_stream(
        {resource_type: 'auto' , public_id:file.originalname},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async LoadFiles() {
    return cloudinary.api.resources({type: 'upload'}, (error, result) => {
      if (error) {
        throw new UnsupportedMediaTypeException();
      }
      return result;
    });
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

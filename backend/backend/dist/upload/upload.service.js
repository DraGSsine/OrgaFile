"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uploadFiles_1 = require("../helpers/uploadFiles");
let UploadService = class UploadService {
    constructor(configService, removedFilesModel, fileModel, userModel, folderModel) {
        this.configService = configService;
        this.removedFilesModel = removedFilesModel;
        this.fileModel = fileModel;
        this.userModel = userModel;
        this.folderModel = folderModel;
        this.s3Client = new AWS.S3({
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
            },
            region: this.configService.get('S3_REGION'),
        });
    }
    async uploadFiles(files, userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            const fileSize = files.reduce((acc, file) => acc + file.size, 0);
            const fileInGb = (fileSize + user.storageUsed) / 1024 / 1024 / 1024;
            if (fileInGb > user.storage) {
                throw new common_1.BadRequestException('Storage limit exceeded');
            }
            else if (user.requestUsed + files.length > user.requestLimit) {
                throw new common_1.BadRequestException('Request limit exceeded');
            }
            const fileDocuments = await (0, uploadFiles_1.uploadFiles)(files, userId, this.fileModel, this.folderModel, this.s3Client);
            user.storageUsed += fileSize;
            user.requestUsed += files.length;
            await user.save();
            return fileDocuments;
        }
        catch (error) {
            if (error.code === 'UnsupportedMediaType') {
                throw new common_1.UnsupportedMediaTypeException();
            }
            else {
                throw error;
            }
        }
    }
    async restoreFile(req, fileId) {
        try {
            const file = await this.removedFilesModel.findOne({
                userId: req.user.userId,
                'files.fileId': fileId,
            });
            if (!file) {
                throw new common_1.NotFoundException('File not found');
            }
            await this.removedFilesModel.updateOne({ userId: req.user.userId }, { $pull: { files: { fileId } } });
            const restoredFile = file.files.find((file) => file.fileId === fileId);
            await this.fileModel.findOneAndUpdate({ userId: req.user.userId }, { $push: { files: restoredFile } }, { upsert: true, new: true });
            return restoredFile;
        }
        catch (error) {
            console.error('Error restoring file:', error);
            throw new common_1.InternalServerErrorException('Failed to restore file');
        }
    }
    async loadFiles(userId) {
        try {
            const files = await this.fileModel.findOne({ userId });
            if (!files) {
                return [];
            }
            return files.files;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load files');
        }
    }
    async loadRecentFiles(userId) {
        try {
            const userFiles = await this.fileModel
                .findOne({ userId })
                .sort({ 'files.createdAt': -1 });
            if (!userFiles) {
                return [];
            }
            const res = userFiles.files
                .slice()
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 9);
            return res;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load files');
        }
    }
    async loadRemovedFiles(userId) {
        try {
            const files = await this.removedFilesModel.findOne({ userId });
            if (!files) {
                return [];
            }
            return files.files;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load files');
        }
    }
    async remove(req, fileId, isPermanently) {
        try {
            const user = await this.userModel.findById(req.user.userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const userFiles = await this.removedFilesModel.findOne({
                userId: req.user.userId,
                'files.fileId': fileId,
            });
            if (isPermanently) {
                const removeResult = await this.removedFilesModel.updateOne({ userId: req.user.userId }, { $pull: { files: { fileId } } });
                if (removeResult.modifiedCount === 0) {
                    throw new common_1.NotFoundException('File not found in removed files');
                }
                const fileKey = `${req.user.userId}/${fileId}`;
                const deleteParams = {
                    Bucket: this.configService.get('S3_BUCKET_NAME'),
                    Key: fileKey,
                };
                await this.s3Client.deleteObject(deleteParams).promise();
                const size = userFiles.files.find((file) => file.fileId === fileId).size;
                user.storageUsed -= size;
                const folderUpdateResult = await this.folderModel.updateOne({ userId: req.user.userId, 'folders.files.fileId': fileId }, { $pull: { 'folders.$.files': { fileId } } });
                if (folderUpdateResult.modifiedCount > 0) {
                    await this.folderModel.updateOne({ userId: req.user.userId }, { $pull: { folders: { files: { $size: 0 } } } });
                }
                await user.save();
                await user.save();
                return 'File deleted permanently';
            }
            else {
                const file = await this.fileModel.findOne({
                    userId: req.user.userId,
                    'files.fileId': fileId,
                });
                if (!file) {
                    throw new common_1.NotFoundException('File not found');
                }
                await this.fileModel.updateOne({ userId: req.user.userId }, { $pull: { files: { fileId } } });
                const removedFile = file.files.find((file) => file.fileId === fileId);
                await this.removedFilesModel.findOneAndUpdate({ userId: req.user.userId }, { $push: { files: removedFile } }, { upsert: true, new: true });
                return removedFile;
            }
        }
        catch (error) {
            console.error('Error removing file:', error);
            throw new common_1.InternalServerErrorException('Failed to remove file');
        }
    }
    async removeMany(req, fileIds, isPermanently) {
        try {
            if (isPermanently) {
                const files = await this.removedFilesModel.findOne({
                    userId: req.user.userId,
                    'files.fileId': { $in: fileIds },
                });
                if (!files) {
                    throw new common_1.NotFoundException('Files not found in removed files');
                }
                const removedFilesSize = files.files
                    .filter((file) => {
                    const isIncluded = fileIds.includes(file.fileId);
                    return isIncluded;
                })
                    .reduce((acc, file) => {
                    return acc + file.size;
                }, 0);
                const removeResult = await this.removedFilesModel.updateOne({ userId: req.user.userId }, { $pull: { files: { fileId: { $in: fileIds } } } });
                if (removeResult.modifiedCount === 0) {
                    throw new common_1.NotFoundException('Files not found in removed files');
                }
                const folderUpdateResult = await this.folderModel.updateOne({ userId: req.user.userId }, {
                    $pull: {
                        folders: { files: { $elemMatch: { fileId: { $in: fileIds } } } },
                    },
                });
                if (folderUpdateResult.modifiedCount > 0) {
                    await this.folderModel.updateOne({ userId: req.user.userId }, { $pull: { folders: { files: { $size: 0 } } } });
                }
                const deleteParams = {
                    Bucket: this.configService.get('S3_BUCKET_NAME'),
                    Delete: {
                        Objects: fileIds.map((fileId) => ({
                            Key: `${req.user.userId}/${fileId}`,
                        })),
                    },
                };
                const user = await this.userModel.findById(req.user.userId);
                const updatedStorage = user.storageUsed - removedFilesSize;
                if (updatedStorage < 0) {
                    user.storageUsed = 0;
                }
                else {
                    user.storageUsed = updatedStorage;
                }
                await user.save();
                await this.s3Client.deleteObjects(deleteParams).promise();
                return 'Files deleted permanently';
            }
            else {
                const files = await this.fileModel.findOne({
                    userId: req.user.userId,
                    'files.fileId': { $in: fileIds },
                });
                if (!files) {
                    throw new common_1.NotFoundException('Files not found');
                }
                await this.fileModel.updateOne({ userId: req.user.userId }, { $pull: { files: { fileId: { $in: fileIds } } } });
                const removedFiles = files.files.filter((file) => fileIds.includes(file.fileId));
                const flattenedRemovedFiles = removedFiles.flat();
                await this.removedFilesModel.findOneAndUpdate({ userId: req.user.userId }, { $push: { files: { $each: flattenedRemovedFiles } } }, { upsert: true, new: true });
                return flattenedRemovedFiles;
            }
        }
        catch (error) {
            console.error('Error removing files:', error);
            throw new common_1.InternalServerErrorException('Failed to remove files');
        }
    }
    async downloadFile(req, fileId) {
        try {
            const file = await this.fileModel.findOne({
                userId: req.user.userId,
                'files.fileId': fileId,
            });
            if (!file) {
                throw new common_1.NotFoundException('File not found');
            }
            const { name } = file.files.find((file) => file.fileId === fileId);
            const fileKey = `${req.user.userId}/${fileId}`;
            const downloadParams = {
                Bucket: this.configService.get('S3_BUCKET_NAME'),
                Key: fileKey,
            };
            const headResult = await this.s3Client
                .headObject(downloadParams)
                .promise();
            const fileSize = headResult.ContentLength;
            const fileStream = this.s3Client
                .getObject(downloadParams)
                .createReadStream();
            return { fileStream, fileName: name, fileSize };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to download file');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('RemovedFile')),
    __param(2, (0, mongoose_1.InjectModel)('File')),
    __param(3, (0, mongoose_1.InjectModel)('User')),
    __param(4, (0, mongoose_1.InjectModel)('Folder')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UploadService);
//# sourceMappingURL=upload.service.js.map
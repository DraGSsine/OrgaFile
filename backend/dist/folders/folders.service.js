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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admZip = require("adm-zip");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
let FoldersService = class FoldersService {
    constructor(configService, folderModel) {
        this.configService = configService;
        this.folderModel = folderModel;
        this.s3Client = new AWS.S3({
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
            },
            region: this.configService.get('S3_REGION'),
        });
    }
    async loadFolders(userId) {
        try {
            const foldersData = await this.folderModel
                .find({ userId })
                .select('folders')
                .lean();
            const folders = foldersData.map((doc) => doc.folders).flat();
            return folders;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load folders');
        }
    }
    async loadOneFolder(folderId, userId) {
        try {
            const userFolders = await this.folderModel.findOne({ userId });
            if (!userFolders) {
                throw new common_1.NotFoundException('Folder not found');
            }
            const folder = userFolders.folders.find((folder) => folder.folderId == folderId);
            if (!folder) {
                throw new common_1.NotFoundException('Folder not found');
            }
            return folder;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load folder');
        }
    }
    async downloadFolder(folderId, userId) {
        try {
            const userFolders = await this.folderModel.findOne({ userId });
            if (!userFolders) {
                throw new common_1.NotFoundException('Folder not found');
            }
            const folder = userFolders.folders.find((f) => f.folderId.toString() === folderId.toString());
            if (!folder) {
                throw new common_1.NotFoundException('Specific folder not found');
            }
            const zip = new admZip();
            const downloadFiles = await this.getFilesInFolder(folder.files);
            for (const file of downloadFiles) {
                zip.addFile(file.name, file.content);
            }
            const zipBuffer = zip.toBuffer();
            const base64Zip = zipBuffer.toString('base64');
            return base64Zip;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to download folder', error.message);
        }
    }
    async getFilesInFolder(files) {
        const data = [];
        for (const file of files) {
            try {
                const { bucket, key } = this.parseS3Url(file.url);
                const response = await this.s3Client
                    .getObject({
                    Bucket: bucket,
                    Key: key,
                })
                    .promise();
                data.push({
                    name: file.name,
                    content: response.Body,
                });
            }
            catch (error) {
                console.error(`Failed to fetch file: ${file.name}, error: ${error.message}`);
            }
        }
        return data;
    }
    parseS3Url(url) {
        const cleanUrl = url.replace(/^\/\//, 'https://');
        const urlPattern = /https:\/\/([^.]+\.s3\.amazonaws\.com)\/([^/]+)\/(.*)/;
        const match = cleanUrl.match(urlPattern);
        if (!match) {
            throw new Error(`Invalid S3 URL format: ${url}`);
        }
        return {
            bucket: match[1].replace('.s3.amazonaws.com', ''),
            key: match[2] + '/' + match[3],
        };
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('Folder')),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], FoldersService);
//# sourceMappingURL=folders.service.js.map
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
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admZip = require("adm-zip");
let FoldersService = class FoldersService {
    constructor(folderModel) {
        this.folderModel = folderModel;
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
            const folder = userFolders.folders.find((folder) => folder.folderId == folderId);
            const zip = new admZip();
            const downloadFiles = await this.getFilesInFolder(folder.files);
            downloadFiles.forEach((download) => {
                const base64Content = Buffer.from(download.content).toString('base64');
                zip.addFile(download.name, Buffer.from(base64Content, 'base64'));
            });
            const archive = zip.toBuffer();
            return archive;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Failed to download folder', error);
        }
    }
    async getFilesInFolder(files) {
        const data = [];
        for (const file of files) {
            try {
                const response = await fetch(file.url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fileContent = await response.arrayBuffer();
                data.push({ name: file.name, content: fileContent });
            }
            catch (error) {
                console.error(`Failed to fetch file: ${file.name}, error: ${error}`);
            }
        }
        return data;
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Folder')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FoldersService);
//# sourceMappingURL=folders.service.js.map
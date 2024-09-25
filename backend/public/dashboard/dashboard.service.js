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
exports.DashboardService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    constructor(fileModel, userModel, folderModel) {
        this.fileModel = fileModel;
        this.userModel = userModel;
        this.folderModel = folderModel;
    }
    async cloudInfo(userId) {
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            let filesFormatInfo = [
                {
                    name: 'pdf',
                    size: 0,
                    numberOfFiles: 0,
                },
                {
                    name: 'docx',
                    size: 0,
                    numberOfFiles: 0,
                },
                {
                    name: 'txt',
                    size: 0,
                    numberOfFiles: 0,
                },
                {
                    name: 'xlsx',
                    size: 0,
                    numberOfFiles: 0,
                },
            ];
            const userFiles = await this.fileModel.findOne({ userId });
            if (!userFiles) {
                return {
                    filesFormatInfo,
                    storageUsed: 0,
                    storage: user.storage,
                };
            }
            const files = userFiles.files;
            files.forEach((file) => {
                const index = filesFormatInfo.findIndex((item) => item.name === file.format);
                if (index !== -1) {
                    filesFormatInfo[index].size += file.size;
                    filesFormatInfo[index].numberOfFiles += 1;
                }
            });
            return {
                filesFormatInfo,
                storageUsed: user.storageUsed / 1024 / 1024 / 1024,
                storage: user.storage,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async loadUserLimits(userId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                storageLimit: user.storage,
                storageUsed: user.storageUsed,
                requestLimit: user.requestLimit,
                requestUsed: user.requestUsed,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('File')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Folder')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
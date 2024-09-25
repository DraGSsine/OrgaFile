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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../guards/auth.guard");
const multer_1 = require("multer");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadFile(files, req) {
        try {
            return this.uploadService.uploadFiles(files, req.user.userId);
        }
        catch (error) {
            if (error instanceof multer_1.default.MulterError &&
                error.code === 'LIMIT_FILE_SIZE') {
                throw new common_1.BadRequestException('File size exceeds the limit of 20 MB');
            }
            throw new common_1.BadRequestException('An error occurred during file upload');
        }
    }
    async restoreFile(requestBody, req) {
        const { fileId } = requestBody;
        return this.uploadService.restoreFile(req, fileId);
    }
    async loadAllFiles(req) {
        return this.uploadService.loadFiles(req.user.userId);
    }
    async findRecentFiles(req) {
        return this.uploadService.loadRecentFiles(req.user.userId);
    }
    async findRemovedFiles(req) {
        return this.uploadService.loadRemovedFiles(req.user.userId);
    }
    remove(req, requestBody) {
        const { fileId, isPermanently } = requestBody;
        return this.uploadService.remove(req, fileId, isPermanently);
    }
    removeMany(req, requestBody) {
        const { files, isPermanently } = requestBody;
        return this.uploadService.removeMany(req, files, isPermanently);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', null, {
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ];
            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                callback(new common_1.BadRequestException('Only PDF, DOCX, TXT, and SLSX files are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('restore'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "restoreFile", null);
__decorate([
    (0, common_1.Get)('load'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "loadAllFiles", null);
__decorate([
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "findRecentFiles", null);
__decorate([
    (0, common_1.Get)('removed'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "findRemovedFiles", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('removemany'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "removeMany", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('api/files'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map
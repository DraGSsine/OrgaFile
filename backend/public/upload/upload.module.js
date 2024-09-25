"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../schemas/auth.schema");
const jwt_1 = require("@nestjs/jwt");
const folders_schema_1 = require("../schemas/folders.schema");
const files_schema_1 = require("../schemas/files.schema");
const removedFiles_schema_1 = require("../schemas/removedFiles.schema");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: auth_schema_1.userSchema },
                { name: 'File', schema: files_schema_1.fileSchema },
                { name: 'Folder', schema: folders_schema_1.folderSchema },
                { name: 'RemovedFile', schema: removedFiles_schema_1.removedFilesSchema },
            ]),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService, jwt_1.JwtService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map
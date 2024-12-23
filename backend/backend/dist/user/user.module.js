"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_guard_1 = require("../guards/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const folders_schema_1 = require("..//schemas/folders.schema");
const files_schema_1 = require("..//schemas/files.schema");
const subscriptions_schema_1 = require("../schemas/subscriptions.schema");
const removedFiles_schema_1 = require("../schemas/removedFiles.schema");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'user', schema: auth_schema_1.userSchema },
                { name: 'folder', schema: folders_schema_1.folderSchema },
                { name: 'file', schema: files_schema_1.fileSchema },
                { name: 'subscription', schema: subscriptions_schema_1.subscriptionSchema },
                { name: 'removedFile', schema: removedFiles_schema_1.removedFilesSchema },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_guard_1.AuthGuard, jwt_1.JwtService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersModule = void 0;
const common_1 = require("@nestjs/common");
const folders_service_1 = require("./folders.service");
const folders_controller_1 = require("./folders.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_schema_1 = require("../schemas/auth.schema");
const mongoose_1 = require("@nestjs/mongoose");
const folders_schema_1 = require("../schemas/folders.schema");
const user_module_1 = require("../user/user.module");
let FoldersModule = class FoldersModule {
};
exports.FoldersModule = FoldersModule;
exports.FoldersModule = FoldersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'user', schema: auth_schema_1.userSchema },
                { name: 'Folder', schema: folders_schema_1.folderSchema },
            ]),
            user_module_1.UserModule,
        ],
        controllers: [folders_controller_1.FoldersController],
        providers: [folders_service_1.FoldersService, jwt_1.JwtService],
    })
], FoldersModule);
//# sourceMappingURL=folders.module.js.map
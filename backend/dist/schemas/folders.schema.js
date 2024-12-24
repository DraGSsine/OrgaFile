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
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderSchema = exports.Folder = exports.FolderInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const files_schema_1 = require("./files.schema");
class FolderInfo {
}
exports.FolderInfo = FolderInfo;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId }),
    __metadata("design:type", Object)
], FolderInfo.prototype, "folderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FolderInfo.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [files_schema_1.fileSchema], default: [] }),
    __metadata("design:type", Array)
], FolderInfo.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], FolderInfo.prototype, "numberOfFiles", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], FolderInfo.prototype, "confidence", void 0);
let Folder = class Folder {
};
exports.Folder = Folder;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId }),
    __metadata("design:type", Object)
], Folder.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [FolderInfo], default: [] }),
    __metadata("design:type", Array)
], Folder.prototype, "folders", void 0);
exports.Folder = Folder = __decorate([
    (0, mongoose_1.Schema)()
], Folder);
exports.folderSchema = mongoose_1.SchemaFactory.createForClass(Folder);
//# sourceMappingURL=folders.schema.js.map
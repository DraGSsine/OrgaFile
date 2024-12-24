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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removedFilesSchema = exports.RemovedFiles = exports.FileInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class FileInfo {
}
exports.FileInfo = FileInfo;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], FileInfo.prototype, "fileId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileInfo.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileInfo.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileInfo.prototype, "format", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], FileInfo.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FileInfo.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileInfo.prototype, "topic", void 0);
let RemovedFiles = class RemovedFiles {
};
exports.RemovedFiles = RemovedFiles;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId }),
    __metadata("design:type", Object)
], RemovedFiles.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: FileInfo }], default: [] }),
    __metadata("design:type", Array)
], RemovedFiles.prototype, "files", void 0);
exports.RemovedFiles = RemovedFiles = __decorate([
    (0, mongoose_1.Schema)()
], RemovedFiles);
exports.removedFilesSchema = mongoose_1.SchemaFactory.createForClass(RemovedFiles);
//# sourceMappingURL=removedFiles.schema.js.map
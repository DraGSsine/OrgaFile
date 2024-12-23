"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const ai_setup_1 = require("../ai/ai-setup");
const getAllCategoryNames = async (folders) => {
    const categories = [];
    for (const folder of folders) {
        for (const category of folder.folders) {
            categories.push(category.name);
        }
    }
    return categories;
};
const uploadFiles = async (files, userId, fileModel, folderModel, s3Client) => {
    try {
        const fileData = [];
        const getAllCategories = [];
        const db_folders = await folderModel.find({ userId });
        const allCategories = await getAllCategoryNames(db_folders);
        getAllCategories.push(...allCategories);
        const uploadPromises = files.map(async (file) => {
            const documentInfo = await (0, ai_setup_1.analyzeDocument)(file);
            const newFileName = await (0, ai_setup_1.generateFileName)(documentInfo);
            const nameKey = `${crypto.randomBytes(16).toString('hex')}-${newFileName}`;
            const fileExtension = file.originalname.split('.').pop();
            const urlend = `${userId}/${nameKey}.${fileExtension}`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: urlend,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            await s3Client.upload(params).promise();
            const data = {
                fileId: `${nameKey}.${fileExtension}`,
                topic: documentInfo.mainTopic,
                url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${urlend}`,
                format: file.originalname.split('.').pop(),
                name: newFileName,
                size: file.size,
                createdAt: new Date(),
                documentType: documentInfo.documentType,
                keyEntities: documentInfo.keyEntities,
                summary: documentInfo.summary,
            };
            fileData.push(data);
        });
        await Promise.all(uploadPromises);
        await fileModel.findOneAndUpdate({ userId }, { $push: { files: { $each: fileData } } }, { upsert: true });
        const categorizationResult = await (0, ai_setup_1.categorizeDocuments)(fileData.map((file) => ({
            mainTopic: file.topic,
            documentType: file.documentType,
            keyEntities: file.keyEntities,
            summary: file.summary,
        })), getAllCategories);
        console.log('-----------------------------------------');
        console.log('Categorization result:', categorizationResult);
        console.log('-----------------------------------------');
        const folderData = categorizationResult.map((cat) => {
            const filesInCategory = fileData.filter((file) => file.topic === cat.originalDocument.mainTopic);
            return {
                folderId: new mongoose_1.Types.ObjectId(),
                name: cat.category,
                files: filesInCategory,
            };
        });
        for (const folder of folderData) {
            const existingFolder = await folderModel.findOne({
                userId,
                'folders.name': folder.name,
            });
            if (existingFolder) {
                await folderModel.findOneAndUpdate({ userId, 'folders.name': folder.name }, {
                    $push: { 'folders.$.files': { $each: folder.files } },
                });
            }
            else {
                await folderModel.findOneAndUpdate({ userId }, { $push: { folders: folder } }, { upsert: true });
            }
        }
    }
    catch (error) {
        if (error.code === 'UnsupportedMediaType') {
            throw new common_1.UnsupportedMediaTypeException();
        }
        else {
            throw error;
        }
    }
};
exports.uploadFiles = uploadFiles;
//# sourceMappingURL=uploadFiles.js.map
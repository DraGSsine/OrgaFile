"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const openai_setup_1 = require("../ai/openai-setup");
const addFileToCategoryBasedOnTopic = (categories, files) => {
    const folders = [];
    for (const category of categories) {
        const filesInCategory = files.filter((file) => category.topics.includes(file.topic));
        folders.push({
            folderId: new mongoose_1.Types.ObjectId(),
            name: category.name,
            files: filesInCategory,
            numberOfFiles: filesInCategory.length,
        });
    }
    return folders;
};
const extractTopicsFromFiles = async (files) => {
    return files.map((file) => file.topic);
};
const organizeFiles = async (files, getAllCategories) => {
    const topics = await extractTopicsFromFiles(files);
    return await (0, openai_setup_1.organizeFilesAnalysis)(topics, getAllCategories);
};
async function getAllCategoryNames(db_folders) {
    try {
        const categoryNames = db_folders
            .flatMap((doc) => doc.folders.map((folder) => folder.name))
            .filter((name) => name !== null && name !== undefined);
        return categoryNames;
    }
    catch (error) {
        console.error('Error retrieving category names:', error);
        throw error;
    }
}
const uploadFiles = async (files, userId, fileModel, folderModel, s3Client) => {
    try {
        const fileData = [];
        const getAllCategories = [];
        const db_folders = await folderModel.find({ userId });
        const allCategories = await getAllCategoryNames(db_folders);
        console.log('All categories:', allCategories);
        getAllCategories.push(...allCategories);
        const uploadPromises = files.map(async (file) => {
            const nameKey = `${crypto.randomBytes(16).toString('hex')}-${file.originalname}`;
            const params = {
                mimetype: file.mimetype,
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `${userId}/${nameKey}`,
                Body: file.buffer,
            };
            await s3Client.upload(params).promise();
            const data = {
                fileId: nameKey,
                topic: 'general',
                url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${userId}/${nameKey}`,
                format: file.originalname.split('.').pop(),
                name: file.originalname,
                size: file.size,
                createdAt: new Date(),
            };
            const topic = await (0, openai_setup_1.analyzeDocument)(file);
            console.log('Topic:', topic);
            data.topic = topic;
            fileData.push(data);
        });
        await Promise.all(uploadPromises);
        await fileModel.findOneAndUpdate({ userId }, { $push: { files: { $each: fileData } } }, { upsert: true });
        const res = await organizeFiles(fileData, []);
        const folderData = addFileToCategoryBasedOnTopic(res, fileData);
        for (const folder of folderData) {
            const existingFolder = await folderModel.findOne({
                userId,
                'folders.name': folder.name,
            });
            if (existingFolder) {
                await folderModel.findOneAndUpdate({ userId, 'folders.name': folder.name }, { $push: { 'folders.$.files': { $each: folder.files } } });
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
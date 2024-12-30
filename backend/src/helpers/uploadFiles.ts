import { Model, ObjectId, Types } from "mongoose";
import { FileDocument, FileInfo } from "../schemas/files.schema";
import { FolderDocument } from "../schemas/folders.schema";
import {
  AiRespone,
  FileMetaData,
  FilesWithMode,
  FolderInfoType,
} from "..//types/type";
import { DocumentAnalyzer } from "../ai/ai-setup";

const getAllCategoryNames = async (folders: FolderDocument[]) => {
  const categories = [];
  for (const folder of folders) {
    for (const category of folder.folders) {
      categories.push(category.name);
    }
  }
  return categories;
};

export const uploadFiles = async (
  files: FilesWithMode,
  userId: ObjectId,
  fileModel: Model<FileDocument>,
  folderModel: Model<FolderDocument>
) => {
  try {
    const fileData = [];
    const getAllCategories = [];
    const documentAnalyzer = new DocumentAnalyzer();
    // Retrieve all folders categories from MongoDB
    const db_folders = await folderModel.find({ userId });
    const allCategories = await getAllCategoryNames(db_folders);
    getAllCategories.push(...allCategories);

    // Upload files to S3 and collect their metadata
    const uploadPromises = files.files.map(async (file: FileMetaData) => {
      // Analyze file to determine its content and topic
      const documentInfo = await documentAnalyzer.analyzeDocument(file);

      const newFileName = await documentAnalyzer.generateFileName(documentInfo);

      const data: FileInfo = {
        fileId: file.fileId,
        topic: documentInfo.mainTopic,
        url: file.url,
        format: file.format,
        name: newFileName,
        size: file.size,
        createdAt: new Date(),
        documentType: documentInfo.documentType,
        keyEntities: documentInfo.keyEntities,
        summary: documentInfo.summary,
      };
      fileData.push(data);
    });

    // Wait for all uploads and metadata processing to finish
    await Promise.all(uploadPromises);
    // Insert uploaded file metadata into MongoDB
    await fileModel.findOneAndUpdate(
      { userId },
      { $push: { files: { $each: fileData } } },
      { upsert: true }
    );

    // Organize files into folders based on enhanced categorization
    const categorizationResult: AiRespone[] = await documentAnalyzer.categorizeDocuments(
      fileData.map((file) => ({
        mainTopic: file.topic,
        documentType: file.documentType,
        keyEntities: file.keyEntities,
        summary: file.summary,
      })),
      getAllCategories,
      files.categorizationMode,
      files.customTags
    );
    console.log("------------------Categorization result-------------------");
    console.log(categorizationResult);
    console.log("-----------------------------------------");
    // Process the categorization result
    const folderData: FolderInfoType[] = categorizationResult.map((cat) => {
      const filesInCategory = fileData.filter(
        (file) => file.topic === cat.originalDocument.mainTopic
      );
      return {
        folderId: new Types.ObjectId(),
        name: cat.category,
        files: filesInCategory,
      };
    });

    // Update or create folders in the database
    for (const folder of folderData) {
      // Check if the folder exists for the user
      const existingFolder = await folderModel.findOne({
        userId,
        "folders.name": folder.name,
      });

      if (existingFolder) {
        // Folder exists, update its files
        await folderModel.findOneAndUpdate(
          { userId, "folders.name": folder.name },
          {
            $push: { "folders.$.files": { $each: folder.files } },
          }
        );
      } else {
        // Folder does not exist, create a new document
        await folderModel.findOneAndUpdate(
          { userId },
          { $push: { folders: folder } },
          { upsert: true }
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

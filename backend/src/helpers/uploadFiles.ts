import { Model, ObjectId, Types } from "mongoose";
import { FileDocument, FileInfo } from "../schemas/files.schema";
import { FolderDocument } from "../schemas/folders.schema";
import {
  FileMetaData,
  FilesWithMode,
  FolderInfoType,
} from "../types/type";
import { DocumentAnalyzer } from "../ai/ai-setup";

const getAllCategoryNames = async (folders: FolderDocument[]): Promise<Set<string>> => {
  return new Set(folders.flatMap(folder => folder.folders.map(f => f.name)));
};

export const uploadFiles = async (
  files: FilesWithMode,
  userId: ObjectId,
  fileModel: Model<FileDocument>,
  folderModel: Model<FolderDocument>
) => {
  try {
    const documentAnalyzer = new DocumentAnalyzer();
    const db_folders = await folderModel.find({ userId });
    const existingCategories = await getAllCategoryNames(db_folders);

    // Process files and get their metadata
    const fileData: FileInfo[] = await Promise.all(
      files.files.map(async (file: FileMetaData) => {
        const documentInfo = await documentAnalyzer.analyzeDocument(file);
        const newFileName = await documentAnalyzer.generateFileName(documentInfo);
        
        return {
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
      })
    );

    // Update files collection
    await fileModel.findOneAndUpdate(
      { userId },
      { $push: { files: { $each: fileData } } },
      { upsert: true }
    );

    // Get categorization for files
    const categorizationResult = await documentAnalyzer.categorizeDocuments(
      fileData.map(file => ({
        mainTopic: file.topic,
        documentType: file.documentType,
        keyEntities: file.keyEntities,
        summary: file.summary,
      })),
      Array.from(existingCategories),
      files.categorizationMode,
      files.customTags
    );

    // Group files by category
    const categoryFileMap = new Map<string, FileInfo[]>();
    categorizationResult.forEach((result, index) => {
      const category = result.category;
      const file = fileData[index];
      
      if (!categoryFileMap.has(category)) {
        categoryFileMap.set(category, []);
      }
      categoryFileMap.get(category)?.push(file);
    });

    // Update folders
    for (const [category, categoryFiles] of categoryFileMap) {
      const existingFolder = await folderModel.findOne({
        userId,
        "folders.name": category
      });

      if (existingFolder) {
        // Update existing folder
        await folderModel.updateOne(
          { 
            userId,
            "folders.name": category 
          },
          { 
            $push: { 
              "folders.$[elem].files": { 
                $each: categoryFiles 
              } 
            } 
          },
          { 
            arrayFilters: [{ "elem.name": category }]
          }
        );
      } else {
        // Create new folder
        const newFolder: FolderInfoType = {
          folderId: new Types.ObjectId(),
          name: category,
          files: categoryFiles
        };

        await folderModel.updateOne(
          { userId },
          { $push: { folders: newFolder } },
          { upsert: true }
        );
      }
    }

  } catch (error) {
    console.error("Upload files error:", error);
    throw new Error("Failed to upload file");
  }
};
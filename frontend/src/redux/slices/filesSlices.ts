import { filesType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import cookies from "js-cookie";
import { extractTextFromFile, validateFileType } from "@/lib/parse";
import { generateFileUrl, getS3SignedUrl } from "@/lib/action";
import pLimit from "p-limit";

type FileMetaData = {
  url: string;
  format: string;
  size: number;
  fileId: string;
  data: string;
};

type FilesState = {
  toggleFile: {
    isOpen: boolean;
    url: string | null;
    isSupported?: boolean;
  };
  loadFilesState: {
    files: filesType[];
    isLoading: boolean;
    error: any;
  };
  recentFilesState: {
    files: filesType[];
    isLoading: boolean;
    error: any;
  };
  removeFileState: {
    filesRemovedPermanently: boolean;
    isMany: boolean;
    confirmRemoveModal: boolean;
    files: string[];
    isPermanently: boolean;
    isLoading: boolean;
    isFileDeleted: boolean;
    isFileDeletedPermanently: boolean;
    error: any;
  };
  loadRemovedFilesState: {
    files: any[];
    isLoading: boolean;
    error: any;
  };

  uploadFileState: {
    isFileUploaded: boolean;
    isLoading: boolean;
    openUploadModal: boolean;
    error: any;
  };
  restoreFileState: {
    fileRestored: boolean;
    isLoading: boolean;
    error: any;
  };
};

const initialState: FilesState = {
  toggleFile: {
    isOpen: false,
    url: null,
    isSupported: false,
  },
  loadFilesState: {
    files: [],
    isLoading: false,
    error: null,
  },
  recentFilesState: {
    files: [],
    isLoading: false,
    error: null,
  },
  removeFileState: {
    filesRemovedPermanently: false,
    isMany: false,
    confirmRemoveModal: false,
    files: [],
    isPermanently: false,
    isLoading: false,
    isFileDeleted: false,
    isFileDeletedPermanently: false,
    error: null,
  },
  loadRemovedFilesState: {
    files: [],
    isLoading: false,
    error: null,
  },
  uploadFileState: {
    isFileUploaded: false,
    openUploadModal: false,
    isLoading: false,
    error: null,
  },
  restoreFileState: {
    fileRestored: false,
    isLoading: false,
    error: null,
  },
};

export const loadAllFiles = createAsyncThunk(
  "files/loadAllFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/load`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to load files");
      }
    }
  }
);

export const uploadFiles = createAsyncThunk(
  "files/uploadFiles",
  async (files: FormData, { rejectWithValue }) => {
    try {
      const categorizationMode = localStorage.getItem("categorizationMode");
      const customTags = JSON.parse(localStorage.getItem("customTags") || "[]");
      const filesList = files.getAll("files");

      if (filesList.length === 0) {
        return rejectWithValue("Please select a file to upload.");
      } else if (filesList.length > 40) {
        return rejectWithValue(
          "You can upload a maximum of 40 files at a time."
        );
      }

      const userId = cookies.get("userId");
      if (!userId) {
        return rejectWithValue("User not authenticated.");
      }

      // Step 1: Validate the files
      const validationResults = await Promise.all(
        Array.from(filesList).map(async (fileEntry: FormDataEntryValue) => {
          const file = fileEntry as File;
          const validation = await validateFileType(file);
          return { file, ...validation };
        })
      );

      const invalidFiles = validationResults.filter(
        (result) => !result.isValid
      );

      // Collect the invalid extensions
      if (invalidFiles.length) {
        const invalidExtensions = invalidFiles
          .map((result) => result.file.name.split(".").pop()) // Get file extension
          .join(", ");

        return rejectWithValue(`Invalid files: [ ${invalidExtensions} ]`);
      }

      // Step 2: Generate metadata and text extraction
      const concurrencyLimit = 5;
      const limit = pLimit(concurrencyLimit);

      const filesMetaData: FileMetaData[] = [];
      const uniqueKey = uuidv4();

      const metadataPromises = validationResults.map(({ file }) =>
        limit(async () => {
          const fileKey = `${userId}/${uniqueKey}-${file.name}`;
          const fileUrl = await generateFileUrl(fileKey);
          const fileContent = await extractTextFromFile(file, fileKey);

          if (!fileContent) {
            throw new Error(`Failed to parse content of file: ${file.name}`);
          }

          filesMetaData.push({
            url: fileUrl,
            format: file.name.split(".").pop()!,
            size: file.size,
            fileId: `${uniqueKey}-${file.name}`,
            data: fileContent,
          });
        })
      );
      await Promise.all(metadataPromises);

      // Step 3: Parallel Uploads to S3
      const uploadPromises = validationResults.map(({ file }) =>
        limit(async () => {
          const fileKey = `${userId}/${uniqueKey}-${file.name}`;
          const { success, url } = await getS3SignedUrl(
            fileKey,
            file.type,
            file.size
          );
          if (!success) {
            throw new Error(`Failed to get signed URL for ${file.name}`);
          }
          return axios.put(url, file, {
            headers: { "Content-Type": file.type },
          });
        })
      );
      await Promise.all(uploadPromises);

      // Step 4: Batch Metadata Upload
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/upload`,
        { files: filesMetaData, categorizationMode, customTags },
        { withCredentials: true }
      );
      return filesMetaData;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to load files");
      }
    }
  }
);

export const removeFile = createAsyncThunk(
  "files/removeFileState",
  async (
    { fileId, isPermanently }: { fileId: string; isPermanently: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/remove`,
        {
          data: { fileId, isPermanently },
          withCredentials: true,
        }
      );
      return isPermanently;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to remove file");
      }
    }
  }
);

export const removeManyFiles = createAsyncThunk(
  "files/removeManyFiles",
  async (
    { files, isPermanently }: { files: string[]; isPermanently: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/removemany`,
        {
          data: { files, isPermanently },
          withCredentials: true,
        }
      );
      return isPermanently;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to remove files");
      }
    }
  }
);

export const loadRecentFiles = createAsyncThunk(
  "files/loadRecentFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/recent`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to load recent files");
      }
    }
  }
);

export const loadRemovedFiles = createAsyncThunk(
  "files/loadRemovedFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/removed`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to load removed files");
      }
    }
  }
);

export const restoreFile = createAsyncThunk(
  "files/restoreFile",
  async ({ fileId }: { fileId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/restore`,
        { fileId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Failed to restore file");
      }
    }
  }
);

export const downloadFile = createAsyncThunk(
  "files/downloadFile",
  async (
    { fileId, fileName }: { fileId: string; fileName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/files/download/${fileId}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      return { fileId, fileName };
    } catch (error) {
      console.error("File download error:", error);
      return rejectWithValue(error);
    }
  }
);

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    ToggleFile: (state, action) => {
      state.toggleFile.isOpen = action.payload.isOpen;
      state.toggleFile.url = action.payload.url;
      state.toggleFile.isSupported = action.payload.url?.includes(".pdf");
    },
    resetConfirmFileRemoveModal: (state) => {
      state.removeFileState.confirmRemoveModal = false;
    },
    resetFilesPermanentlyDeleted: (state) => {
      state.removeFileState.filesRemovedPermanently = false;
    },

    resetFilesState: (state) => {
      state.loadFilesState.files = [];
      state.loadFilesState.isLoading = false;
      state.loadFilesState.error = null;
      state.recentFilesState.files = [];
      state.recentFilesState.isLoading = false;
      state.recentFilesState.error = null;
      state.removeFileState.isMany = false;
      state.removeFileState.confirmRemoveModal = false;
      state.removeFileState.files = [];
      state.removeFileState.isPermanently = false;
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = false;
      state.removeFileState.error = null;
      state.loadRemovedFilesState.files = [];
      state.loadRemovedFilesState.isLoading = false;
      state.loadRemovedFilesState.error = null;
      state.uploadFileState.isFileUploaded = false;
      state.uploadFileState.isLoading = false;
      state.uploadFileState.error = null;
      // state.uploadFileState.openUploadModal = false;
      state.restoreFileState.fileRestored = false;
      state.restoreFileState.isLoading = false;
      state.restoreFileState.error = null;
    },
    setRemoveFiles: (state, action) => {
      state.removeFileState.isMany = action.payload.isMany;
      state.removeFileState.files = action.payload.files;
      state.removeFileState.isPermanently = action.payload.isPermanently;
    },
    setConfirmFileRemoveModal: (state, action) => {
      state.removeFileState.confirmRemoveModal = action.payload;
    },
    setUploadModal: (state, action) => {
      state.uploadFileState.openUploadModal = action.payload;
      if (action.payload == false) {
        // reset the upload file state
        state.uploadFileState.isFileUploaded = false;
        state.uploadFileState.isLoading = false;
        state.uploadFileState.error = null;
      }
    },
    resetFileResotreState: (state) => {
      state.restoreFileState.fileRestored = false;
      state.restoreFileState.isLoading = false;
      state.restoreFileState.error = null;
    },
  },
  extraReducers(builder) {
    // Upload files

    builder.addCase(uploadFiles.pending, (state) => {
      state.uploadFileState.isLoading = true;
      state.uploadFileState.error = null;
    });
    builder.addCase(uploadFiles.fulfilled, (state) => {
      state.uploadFileState.isFileUploaded = true;
      state.uploadFileState.isLoading = false;
      state.uploadFileState.error = null;
    });
    builder.addCase(uploadFiles.rejected, (state, action: any) => {
      state.uploadFileState.isLoading = false;
      state.uploadFileState.error = action.payload || null;
    });

    // Load files

    builder.addCase(loadAllFiles.pending, (state) => {
      state.loadFilesState.isLoading = true;
      state.loadFilesState.error = null;
    });
    builder.addCase(loadAllFiles.fulfilled, (state, action) => {
      state.loadFilesState.files = action.payload;
      state.loadFilesState.isLoading = false;
      state.loadFilesState.error = null;
    });
    builder.addCase(loadAllFiles.rejected, (state, action: any) => {
      state.loadFilesState.isLoading = false;
      state.loadFilesState.error = action.payload || null;
    });

    // Load Recent Files

    builder.addCase(loadRecentFiles.pending, (state) => {
      state.recentFilesState.isLoading = true;
      state.recentFilesState.error = null;
    });
    builder.addCase(loadRecentFiles.fulfilled, (state, action) => {
      state.recentFilesState.files = action.payload;
      state.recentFilesState.isLoading = false;
      state.recentFilesState.error = null;
    });
    builder.addCase(loadRecentFiles.rejected, (state, action: any) => {
      state.recentFilesState.isLoading = false;
      state.recentFilesState.error = action.payload || null;
    });

    // lead removed files

    builder.addCase(loadRemovedFiles.pending, (state) => {
      state.loadRemovedFilesState.isLoading = true;
      state.loadRemovedFilesState.error = null;
    });
    builder.addCase(loadRemovedFiles.fulfilled, (state, action) => {
      state.loadRemovedFilesState.files = action.payload;
      state.loadRemovedFilesState.isLoading = false;
      state.loadRemovedFilesState.error = null;
      state.removeFileState.isFileDeleted = false;
    });
    builder.addCase(loadRemovedFiles.rejected, (state, action: any) => {
      state.loadRemovedFilesState.isLoading = false;
      state.loadRemovedFilesState.error = action.payload || null;
    });

    // remove files

    builder.addCase(removeFile.pending, (state) => {
      state.removeFileState.isLoading = true;
      state.removeFileState.error = null;
    });
    builder.addCase(removeFile.fulfilled, (state, action: any) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = true;
      state.removeFileState.error = null;
      state.removeFileState.filesRemovedPermanently = action.payload;
    });
    builder.addCase(removeFile.rejected, (state, action: any) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.error = action.payload || null;
    });

    // remove many files

    builder.addCase(removeManyFiles.pending, (state) => {
      state.removeFileState.isLoading = true;
      state.removeFileState.error = null;
    });
    builder.addCase(removeManyFiles.fulfilled, (state, action: any) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = true;
      state.removeFileState.error = null;
      state.removeFileState.filesRemovedPermanently = action.payload;
    });
    builder.addCase(removeManyFiles.rejected, (state, action: any) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.error = action.payload || null;
    });

    // restore file

    builder.addCase(restoreFile.pending, (state) => {
      state.restoreFileState.isLoading = true;
      state.restoreFileState.error = null;
    });
    builder.addCase(restoreFile.fulfilled, (state) => {
      state.restoreFileState.isLoading = false;
      state.restoreFileState.error = null;
      state.restoreFileState.fileRestored = true;
    });
    builder.addCase(restoreFile.rejected, (state, action: any) => {
      state.restoreFileState.isLoading = false;
      state.restoreFileState.error = action.payload || null;
    });
  },
});

export const {
  resetFilesState,
  setConfirmFileRemoveModal,
  setRemoveFiles,
  setUploadModal,
  resetConfirmFileRemoveModal,
  ToggleFile,
  resetFileResotreState,
  resetFilesPermanentlyDeleted,
} = filesSlice.actions;

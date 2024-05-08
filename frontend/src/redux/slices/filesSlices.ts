import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FilesState } from "@/types/types";
import cookie from "js-cookie";

type FilesState = {
  loadFiles: {
    files: any[];
    isLoading: boolean;
    error: any;
  };
  removeFile: {
    file: string | null;
    isFileDeleted: boolean;
    fileDeletLoading: boolean;
    confirmeRemoveModal: boolean;
    error: any;
  };
  removeManyFiles: {
    files: String[];
    isManyFileDeleted: boolean;
    isLoading: boolean;
    confirmeRemoveModal: boolean;
    error: any;
  };
  uploadFile: {
    isFileUploaded: boolean;
    isLoading: boolean;
    openUploadModal: boolean;
    error: any;
  };
};

const initialState: FilesState = {
  loadFiles: {
    files: [],
    isLoading: true,
    error: null,
  },
  removeFile: {
    file: null,
    confirmeRemoveModal: false,
    isFileDeleted: false,
    fileDeletLoading: false,
    error: null,
  },
  removeManyFiles: {
    files: [],
    isManyFileDeleted: false,
    isLoading: true,
    confirmeRemoveModal: false,
    error: null,
  },
  uploadFile: {
    isFileUploaded: false,
    openUploadModal: false,
    isLoading: false,
    error: null,
  },
};

export const loaAlldFiles = createAsyncThunk(
  "files/loaAlldFiles",
  async (signal: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9010/api/files/load", {
        method: "GET",
        signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const uploadFiles = createAsyncThunk(
  "files/uploadFiles",
  async (files: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9010/api/files/upload", {
        method: "POST",
        body: files,
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (fileid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:9010/api/files/remove`, {
        method: "DELETE",
        body: JSON.stringify({ fileid }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      const res = await response.json();
      if (!response.ok) {
        return rejectWithValue(await res);
      }
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const deleteManyFiles = createAsyncThunk(
  "files/deleteManyFiles",
  async (files: String[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:9010/api/files/removemany",
        {
          method: "DELETE",
          body: JSON.stringify({ files }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (!response.ok) {
        return rejectWithValue(await res);
      }
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    resetFiles: (state) => {
      state.removeFile.isFileDeleted = false;
      state.removeFile.fileDeletLoading = false;
      state.removeManyFiles.isManyFileDeleted = false;
      state.removeManyFiles.isLoading = false;
      state.uploadFile.isFileUploaded = false;
      state.uploadFile.isLoading = false;
    },
    setConfirmManyFileRemove: (state, action) => {
      state.removeManyFiles.files = action.payload.files;
      state.removeManyFiles.confirmeRemoveModal = action.payload.active;
    },
    setConfirmFileRemove: (state, action) => {
      state.removeFile.file= action.payload.fileId;
      state.removeFile.confirmeRemoveModal = action.payload.active;
    },
    setUploadModal: (state, action) => {
      state.uploadFile.openUploadModal = action.payload;
    },
  },
  extraReducers(builder) {
    // Load files
    builder.addCase(loaAlldFiles.pending, (state) => {
      state.loadFiles.isLoading = true;
      state.loadFiles.error = null;
    });
    builder.addCase(loaAlldFiles.fulfilled, (state, action) => {
      state.loadFiles.files = action.payload;
      state.loadFiles.isLoading = false;
      state.loadFiles.error = null;
    });
    builder.addCase(loaAlldFiles.rejected, (state, action: any) => {
      state.loadFiles.isLoading = false;
      state.loadFiles.error = action.payload || null;
    });

    // Upload files

    builder.addCase(uploadFiles.pending, (state) => {
      state.uploadFile.isLoading = true;
      state.uploadFile.error = null;
    });
    builder.addCase(uploadFiles.fulfilled, (state) => {
      state.uploadFile.isFileUploaded = true;
      state.uploadFile.isLoading = false;
      state.uploadFile.error = null;
    });
    builder.addCase(uploadFiles.rejected, (state, action: any) => {
      state.uploadFile.isLoading = false;
      state.uploadFile.error = action.payload || null;
    });

    // Delete file

    builder.addCase(deleteFile.pending, (state) => {
      state.removeFile.fileDeletLoading = true;
      state.removeFile.error = null;
    });
    builder.addCase(deleteFile.fulfilled, (state) => {
      state.removeFile.isFileDeleted = true;
      state.removeFile.fileDeletLoading = false;
      state.removeFile.error = null;
    });
    builder.addCase(deleteFile.rejected, (state, action: any) => {
      state.removeFile.fileDeletLoading = false;
      state.removeFile.error = action.payload || null;
    });

    // Delete many files

    builder.addCase(deleteManyFiles.pending, (state) => {
      state.removeManyFiles.isLoading = true;
      state.removeManyFiles.error = null;
    });
    builder.addCase(deleteManyFiles.fulfilled, (state) => {
      state.removeManyFiles.isManyFileDeleted = true;
      state.removeManyFiles.isLoading = false;
      state.removeManyFiles.error = null;
    });
    builder.addCase(deleteManyFiles.rejected, (state, action: any) => {
      state.removeManyFiles.isLoading = false;
      state.removeManyFiles.error = action.payload || null;
    });

    // load removed files
  },
});

export const {
  resetFiles,
  setConfirmFileRemove,
  setConfirmManyFileRemove,
  setUploadModal,
} = filesSlice.actions;

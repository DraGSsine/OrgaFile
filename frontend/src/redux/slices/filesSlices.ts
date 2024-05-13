import { filesType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "js-cookie";
const base_url = "http://localhost:9010/"

type FilesState = {
  loadFilesState: {
    files: any[];
    isLoading: boolean;
    error: any;
  };
  recentFilesState: {
    files: any[];
    isLoading: boolean;
    error: any;
  };
  removeFileState: {
    isMany: boolean;
    confirmRemoveModal: boolean;
    files: string[];
    isPremanently: boolean;
    isLoading: boolean;
    isFileDeleted: boolean;
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
  loadFilesState: {
    files: [],
    isLoading: true,
    error: null,
  },
  recentFilesState: {
    files: [],
    isLoading: true,
    error: null,
  },
  removeFileState: {
    isMany: false,
    confirmRemoveModal: false,
    files: [],
    isPremanently: false,
    isLoading: false,
    isFileDeleted: false,
    error: null,
  },
  loadRemovedFilesState: {
    files: [],
    isLoading: true,
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
  async (signal: any, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}api/files/load`, {
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
      const response = await fetch(`${base_url}api/files/upload`, {
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

export const removeFile = createAsyncThunk(
  "files/removeFileState",
  async (
    { fileId, isPremanently }: { fileId: string; isPremanently: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${base_url}api/files/remove`, {
        method: "DELETE",
        body: JSON.stringify({ fileId, isPremanently }),
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

export const removeManyFiles = createAsyncThunk(
  "files/removeManyFiles",
  async (
    { files, isPremanently }: { files: string[]; isPremanently: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${base_url}api/files/removemany`,
        {
          method: "DELETE",
          body: JSON.stringify({ files, isPremanently }),
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

export const loadRecentFiles = createAsyncThunk(
  "files/loadRecentFiles",
  async () => {
    try {
      const response = await fetch(`${base_url}api/files/recent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res);
      }
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const loadRemovedFiles = createAsyncThunk(
  "files/loadRemovedFiles",
  async (_, { rejectWithValue }) => {
    try {
      const respone = await fetch(`${base_url}api/files/removed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      const res = await respone.json();
      if (!respone.ok) {
        return rejectWithValue(await res);
      }
      return res;
    } catch (error: any) {
      throw new error(error);
    }
  }
);

export const restoreFile = createAsyncThunk(
  "files/restoreFile",
  async ({ fileId }: { fileId: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}api/files/restore`, {
        method: "POST",
        body: JSON.stringify({ fileId }),
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

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    resetFilesState: (state) => {
      state.loadFilesState.files = [];
      state.loadFilesState.isLoading = true;
      state.loadFilesState.error = null;
      state.recentFilesState.files = [];
      state.recentFilesState.isLoading = true;
      state.recentFilesState.error = null;
      state.removeFileState.isMany = false;
      state.removeFileState.confirmRemoveModal = false;
      state.removeFileState.files = [];
      state.removeFileState.isPremanently = false;
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = false;
      state.removeFileState.error = null;
      state.loadRemovedFilesState.files = [];
      state.loadRemovedFilesState.isLoading = true;
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
      state.removeFileState.isPremanently = action.payload.isPremanently;
    },
    setConfirmFileRemoveModal: (state, action) => {
      state.removeFileState.confirmRemoveModal = action.payload;
    },
    setUploadModal: (state, action) => {
      state.uploadFileState.openUploadModal = action.payload;
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
    builder.addCase(removeFile.fulfilled, (state) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = true;
      state.removeFileState.error = null;
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
    builder.addCase(removeManyFiles.fulfilled, (state) => {
      state.removeFileState.isLoading = false;
      state.removeFileState.isFileDeleted = true;
      state.removeFileState.error = null;
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
} = filesSlice.actions;
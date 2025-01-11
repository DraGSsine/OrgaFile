import { FolderType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type initialStateType = {
  downloadFolder: {
    downloadingFolderId: string[];
    archive: any;
    isLoading: boolean;
    error: boolean;
  };
  deleteFolder: {
    deleteingFolderId: string[];
    isLoading: boolean;
    error: boolean;
    isDeleted: boolean;
  };
  loadOneFolder: {
    folder: FolderType | null;
    isLoading: boolean;
    error: boolean;
  };
  loadFolders: {
    folders: FolderType[];
    isLoading: boolean;
    error: boolean;
  };
};

const initialState: initialStateType = {
  downloadFolder: {
    downloadingFolderId: [],
    archive: null,
    isLoading: false,
    error: false,
  },
  deleteFolder: {
    deleteingFolderId: [],
    isLoading: false,
    error: false,
    isDeleted: false,
  },
  loadOneFolder: {
    folder: null,
    isLoading: false,
    error: false,
  },
  loadFolders: {
    folders: [],
    isLoading: false,
    error: false,
  },
};

export const loadOneFolder = createAsyncThunk(
  "folders/loadOneFolder",
  async (folderId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/load/${folderId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch folders");
      }
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadFolders = createAsyncThunk(
  "folders/loadFolders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/load`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch folders");
      }
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const downloadFolder = createAsyncThunk(
  "folders/downloadFolder",
  async (
    { folderId, folderName }: { folderId: string; folderName: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/download/${folderId}`,
        {
          withCredentials: true,
          responseType: "text",
        }
      );

      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch folder");
      }

      // Convert Base64 to Blob
      const base64Response = res.data;
      const binaryString = window.atob(base64Response);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return folderId;
    } catch (error) {
      console.error("Download error:", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/delete/${folderId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) {
        return rejectWithValue("Failed to delete folder");
      }
      return folderId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    resetFolderState: (state) => {
      state.loadOneFolder = {
        folder: null,
        isLoading: false,
        error: false,
      };
      state.loadFolders = {
        folders: [],
        isLoading: false,
        error: false,
      };
      state.downloadFolder = {
        downloadingFolderId: [],
        archive: null,
        isLoading: false,
        error: false,
      };
    },
    // set downloading foldre
    setDownloadingFolder: (state, action) => {
      state.downloadFolder.downloadingFolderId.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadOneFolder.pending, (state) => {
      state.loadOneFolder.isLoading = true;
    });
    builder.addCase(loadOneFolder.fulfilled, (state, action) => {
      state.loadOneFolder.folder = action.payload;
      state.loadOneFolder.isLoading = false;
    });
    builder.addCase(loadOneFolder.rejected, (state) => {
      state.loadOneFolder.error = true;
      state.loadOneFolder.isLoading = false;
    });

    builder.addCase(loadFolders.pending, (state) => {
      state.loadFolders.isLoading = true;
    });
    builder.addCase(loadFolders.fulfilled, (state, action) => {
      state.loadFolders.folders = action.payload;
      state.loadFolders.isLoading = false;
    });
    builder.addCase(loadFolders.rejected, (state) => {
      state.loadFolders.error = true;
      state.loadFolders.isLoading = false;
    });

    builder.addCase(downloadFolder.pending, (state) => {
      state.downloadFolder.isLoading = true;
    });
    builder.addCase(downloadFolder.fulfilled, (state, action) => {
      state.downloadFolder.archive = "Downloaded";
      state.downloadFolder.isLoading = false;
      state.downloadFolder.downloadingFolderId =
        state.downloadFolder.downloadingFolderId.filter(
          (id) => id !== action.payload
        );
    });
    builder.addCase(downloadFolder.rejected, (state) => {
      state.downloadFolder.error = true;
      state.downloadFolder.isLoading = false;
    });
    builder.addCase(deleteFolder.pending, (state) => {
      state.deleteFolder.isLoading = true;
      state.deleteFolder.isDeleted = false;
    });
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      state.deleteFolder.isDeleted = true;
      state.deleteFolder.deleteingFolderId =
        state.deleteFolder.deleteingFolderId.filter(
          (id) => id !== action.payload
        );
      state.deleteFolder.isLoading = false;
    });
    builder.addCase(deleteFolder.rejected, (state) => {
      state.deleteFolder.error = true;
      state.deleteFolder.isLoading = false;
    });
  },
});

export const { resetFolderState, setDownloadingFolder } = foldersSlice.actions;

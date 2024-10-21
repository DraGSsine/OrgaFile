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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/load/${folderId}`, {
        withCredentials: true,
      });
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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/load`, {
        withCredentials: true,
      });
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
  async ({folderId,folderName}:{folderId:string,folderName:string}, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/folders/download/${folderId}`, {
        withCredentials: true,
      });
      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch folders");
      }
      const data = await res.data.blob();
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      return {data, folderId};
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
      state.downloadFolder.downloadingFolderId.push(action.payload)
    }
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
      state.downloadFolder.archive = JSON.stringify(action.payload.data);
      state.downloadFolder.isLoading = false;
      state.downloadFolder.downloadingFolderId.filter((id) => id !== action.payload.folderId)
    });
    builder.addCase(downloadFolder.rejected, (state) => {
      state.downloadFolder.error = true;
      state.downloadFolder.isLoading = false;
    });
  },
});

export const { resetFolderState , setDownloadingFolder } = foldersSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadState } from "@/types/types";
import cookie from "js-cookie";
const initialState: loadState = {
  files: [],
  deleteFileId: "",
  isFilesUploaded: false,
  isFilesLoaded: false,
  isFileDeleted: false,
  isLoading: true,
  error: null,
};

export const loadFiles = createAsyncThunk(
  "files/loadFiles",
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
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:9010/api/files/remove?fileid=${fileId}`,
        {
          method: "DELETE",
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
      state.files = [];
      state.isFilesUploaded = false;
      state.isFilesLoaded = false;
      state.isFileDeleted = false;
      state.isLoading = false;
      state.error = null;
    },
    setDeltedFile: (state, action) => {
      state.isFileDeleted = false;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadFiles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.files = action.payload;
      state.isFilesLoaded = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loadFiles.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
    builder.addCase(uploadFiles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(uploadFiles.fulfilled, (state) => {
      state.isFilesUploaded = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(uploadFiles.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
    builder.addCase(deleteFile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteFile.fulfilled, (state) => {
      state.isFileDeleted = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteFile.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

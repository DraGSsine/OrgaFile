import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../store";
import Cookies from "js-cookie";
type FolderState = {
  loadFolders: {
    folders: any[];
    loading: boolean;
    error: null | string;
  };
};

const initialState: FolderState = {
  loadFolders: {
    folders: [],
    loading: false,
    error: null,
  },
};

export const loadFolders = createAsyncThunk(
  "folders/loadFolders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${base_url}api/folders/load`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (!res.ok) {
        return rejectWithValue("Failed to fetch folders");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const foldersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetFolderState: (state) => {
      state.loadFolders.loading = false;
      state.loadFolders.folders = [];
      state.loadFolders.error = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadFolders.pending, (state) => {
      state.loadFolders.loading = true;
    });
    builder.addCase(loadFolders.fulfilled, (state, action: any) => {
      state.loadFolders.loading = false;
      state.loadFolders.folders = action.payload;
      state.loadFolders.error = null;
    });
    builder.addCase(loadFolders.rejected, (state, action: any) => {
      state.loadFolders.loading = false;
      state.loadFolders.error = action.payload || null;
    });
  },
});

export const { resetFolderState } = foldersSlice.actions;

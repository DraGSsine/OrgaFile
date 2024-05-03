import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadState } from "@/types/types";
import cookie from "js-cookie";
const initialState: loadState = {
  files: [],
  isLoading: false,
  error: null,
};

export const loadFiles = createAsyncThunk(
  "files/loadFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9010/api/files/load", {
        method: "GET",
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

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadFiles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.files = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loadFiles.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });
  },
});

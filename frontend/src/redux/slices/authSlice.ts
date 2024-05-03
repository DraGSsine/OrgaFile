import { initialStateType, userInfoType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

const initialState: initialStateType = {
  isAuthenticated: false,
  error: null,
  loading: false,
  userCreated: null,
};

export const SignUpAction = createAsyncThunk(
  "auth/signup",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9010/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SignInAction = createAsyncThunk(
  "auth/signin",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9010/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return rejectWithValue(await response.json());
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SignUpAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignUpAction.fulfilled, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userCreated = action.payload;
    });
    builder.addCase(SignUpAction.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || null;
      state.userCreated = null;
    });
    builder.addCase(SignInAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignInAction.fulfilled, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userCreated = action.payload;
    });
    builder.addCase(SignInAction.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || null;
      state.userCreated = null;
    });
  },
});

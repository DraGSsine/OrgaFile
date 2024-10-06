import { initialStateType, userInfoType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sign } from "crypto";
import cookie from "js-cookie";

const initialState: initialStateType = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  userCreated: null,
};

export const SignUpAction = createAsyncThunk(
  "auth/signup",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
        {
          ...data,
        }
      );
      const responseData = await response.data;
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SignInAction = createAsyncThunk(
  "auth/signin",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
        {
          ...data,
        },
        { withCredentials: true }
      );

      const responseData = await response.data;
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SignOutAction = createAsyncThunk("auth/signout", async () => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userCreated = null;
      state.error = null;
    },
    resetAuthState: (state) => {
      state.isAuthenticated = false;
      state.userCreated = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(SignUpAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SignUpAction.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userCreated = action.payload;
    });
    builder.addCase(SignUpAction.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
      state.userCreated = null;
    });
    // Signin
    builder.addCase(SignInAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SignInAction.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userCreated = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
    });
    builder.addCase(SignInAction.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload || null;
      state.userCreated = null;
    });
    // Signout
    builder.addCase(SignOutAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SignOutAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.userCreated = null;
      localStorage.removeItem("userInfo");
    });
    builder.addCase(SignOutAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { signOut, resetAuthState } = AuthSlice.actions;

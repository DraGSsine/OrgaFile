import { initialStateType, userInfoType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: initialStateType = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  userCreated: null,
  userInfoLoading: true,
  userInformation: { fullName: "", email: "", plan: "", subscriptionEnds:"", price:"" , subscriptionHistory: [] },
};

export const SignUpAction = createAsyncThunk(
  "auth/signup",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/auth/signup`,
        {
          ...data,
        },
        {
          withCredentials: true,
        }
      );
      const responseData = await response.data;
      return responseData;
    } catch (error: any) {
      console.log(error.response.data.message);
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const SignInAction = createAsyncThunk(
  "auth/signin",
  async (data: userInfoType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/auth/signin`,
        { ...data },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const SignOutAction = createAsyncThunk("auth/signout", async () => {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/auth/signout`,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

export const GetUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/user`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
)

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
    updateUserInfo: (state, action) => {
      state.userInformation = { ...state.userInformation, ...action.payload };
    }
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
    });
    builder.addCase(SignOutAction.rejected, (state) => {
      state.userInfoLoading = false;
    });
    // Get user info
    builder.addCase(GetUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserInfo.fulfilled, (state, action: any) => {
      state.userInfoLoading = false;
      state.userInformation = action.payload;
    });
    builder.addCase(GetUserInfo.rejected, (state) => {
      state.userInfoLoading = false
    });
  },
});

export const { signOut, resetAuthState, updateUserInfo } = AuthSlice.actions;

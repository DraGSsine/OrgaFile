import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userInfoType } from "@/types/types";

export type UserState = {
  loading: boolean;
  response: any;
};

const initialState: UserState = {
  loading: false,
  response: undefined
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userInfo: userInfoType, thunkAPI) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (userInfo: userInfoType, thunkAPI) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
      });
  }
});

export default userSlice.reducer;

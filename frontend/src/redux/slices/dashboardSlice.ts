import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface initialStateType {
  userLimits: {
    storageLimit: number;
    storageUsed: number;
    requestLimit: number;
    requestUsed: number;
    loading: boolean;
    error: any;
  };
  cloudInfo: {
    data: {
      filesFormatInfo: {
        name: string;
        size: number;
        numberOfFiles: number;
      }[];
      storageUsed: number;
      storage: number;
    };
    loading: boolean;
    error: any;
  };
  logOutModal: {
    isOpen: boolean;
  };
}

const initialState: initialStateType = {
  userLimits: {
    storageLimit: 0,
    storageUsed: 0,
    requestLimit: 0,
    requestUsed: 0,
    loading: true,
    error: null,
  },
  cloudInfo: {
    data: {
      filesFormatInfo: [],
      storageUsed: 0,
      storage: 0,
    },
    loading: true,
    error: null,
  },
  logOutModal: {
    isOpen: false,
  },
};

export const loadUserLimits = createAsyncThunk(
  "dashboard/loadUserLimits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/dashboard/load-user-limits`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadClouInfo = createAsyncThunk(
  "dashboard/loadCloudInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/dashboard/load-cloud-info`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openLogOutModal: (state) => {
      state.logOutModal.isOpen = true;
    },
    closeLogOutModal: (state) => {
      state.logOutModal.isOpen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserLimits.pending, (state) => {
      state.userLimits.loading = true;
    });
    builder.addCase(loadUserLimits.fulfilled, (state, { payload }) => {
      state.userLimits.loading = false;
      state.userLimits.storageLimit = payload.storageLimit;
      state.userLimits.storageUsed = payload.storageUsed;
      state.userLimits.requestLimit = payload.requestLimit;
      state.userLimits.requestUsed = payload.requestUsed;
    });
    builder.addCase(loadUserLimits.rejected, (state, { payload }) => {
      state.userLimits.loading = false;
      state.userLimits.error = payload;
    });

    builder.addCase(loadClouInfo.pending, (state) => {
      state.cloudInfo.loading = true;
    });
    builder.addCase(loadClouInfo.fulfilled, (state, { payload }) => {
      state.cloudInfo.loading = false;
      state.cloudInfo.data = payload;
    });

    builder.addCase(loadClouInfo.rejected, (state, { payload }) => {
      state.cloudInfo.loading = false;
      state.cloudInfo.error = payload;
    });
  },
});

export const { openLogOutModal, closeLogOutModal } = dashboardSlice.actions;
import { initialDashboardStateType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: initialDashboardStateType = {
  userLimits: {
    storageLimit: 0,
    storageUsed: 0,
    creditsLimit: 0,
    creditsUsed: 0,
    loading: true,
    error: null,
  },
  SignoutModal: {
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

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openSignoutModal: (state) => {
      state.SignoutModal.isOpen = true;
    },
    closeSignoutModal: (state) => {
      state.SignoutModal.isOpen = false;
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
      state.userLimits.creditsLimit = payload.creditsLimit;
      state.userLimits.creditsUsed = payload.creditsUsed;
    });
    builder.addCase(loadUserLimits.rejected, (state, { payload }) => {
      state.userLimits.loading = false;
      state.userLimits.error = "Failed to fetch user limits";
    });
  },
});

export const { openSignoutModal, closeSignoutModal } = dashboardSlice.actions;

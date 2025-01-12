import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { profile } from "console";

type ProfileInfoType = {
    loading: boolean;
    error: string | null;
    success: boolean;
    user: any;
}

type ProfilePasswordType = {
    loading: boolean;
    error: string | null;
    success: boolean;
}

type ProfileDeleteType = {
    loading: boolean;
    error: string | null;
    success: boolean;
}

export type SettingsState = {
    profileInfo: ProfileInfoType;
    profilePassword: ProfilePasswordType;
    profileDelete: ProfileDeleteType;
}

const initialState: SettingsState = {
    profileInfo: {
        loading: false,
        error: null,
        success: false,
        user: null,
    },
    profilePassword: {
        loading: false,
        error: null,
        success: false,
    },
    profileDelete: {
        loading: false,
        error: null,
        success: false,
    },
}

export const UpdateProfileInfo = createAsyncThunk("settings/updateProfileInfo", async (data: any, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/user/update-profile`, data, {
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        throw rejectWithValue(error.response.data.message);
    }
}
)

export const UpdateProfilePassword = createAsyncThunk("settings/updateProfilePassword", async (data: any, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/user/update-password`, data, {
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
}
)

export const DeleteProfile = createAsyncThunk("settings/deleteProfile", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/user/delete`, {
            withCredentials: true,
        });
        return res
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
}
)


export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        resetProfileInfo: (state) => {
            state.profileInfo = initialState.profileInfo;
        },
        resetProfilePassword: (state) => {
            state.profilePassword = initialState.profilePassword;
        },
        resetProfileDelete: (state) => {
            state.profileDelete = initialState.profileDelete;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(UpdateProfileInfo.pending, (state) => {
            state.profileInfo.loading = true;
        }
        ).addCase(UpdateProfileInfo.fulfilled, (state) => {
            state.profileInfo.loading = false;
            state.profileInfo.success = true;
            state.profileInfo.error = null;
        }
        ).addCase(UpdateProfileInfo.rejected, (state, { payload }) => {
            state.profileInfo.loading = false;
            state.profileInfo.error = payload as string;
        }
        ).addCase(UpdateProfilePassword.pending, (state) => {
            state.profilePassword.loading = true;
        }
        ).addCase(UpdateProfilePassword.fulfilled, (state) => {
            state.profilePassword.loading = false;
            state.profilePassword.success = true;
        }
        ).addCase(UpdateProfilePassword.rejected, (state, { payload }) => {
            state.profilePassword.loading = false;
            state.profilePassword.error = payload as string;
        }
        ).addCase(DeleteProfile.pending, (state) => {
            state.profileDelete.loading = true;
        }
        ).addCase(DeleteProfile.fulfilled, (state) => {
            state.profileDelete.loading = false;
            state.profileDelete.success = true;
        }
        ).addCase(DeleteProfile.rejected, (state, { payload }) => {
            state.profileDelete.loading = false;
            state.profileDelete.success = false;
            state.profileDelete.error = "Error deleting profile try again later";
        }
        )
    }
})

export const { resetProfileInfo, resetProfilePassword, resetProfileDelete } = settingsSlice.actions;
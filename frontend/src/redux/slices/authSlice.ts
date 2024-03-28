import { initialStateType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState:initialStateType = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({ name: "auth", initialState, reducers: {
    setCredentials:(state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.isAuthenticated = true;
        state.loading = false;
    },
    clearCredentials:(state) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
        state.isAuthenticated = false;
        state.loading = false;
    },
} });

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
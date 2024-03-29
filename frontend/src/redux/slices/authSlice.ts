import { initialStateType } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState: initialStateType = {
  userInfo: Cookies.get("userInfo") || null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      Cookies.set("userInfo", JSON.stringify(action.payload), { expires: 7 });
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      Cookies.remove("userInfo");
      state.isAuthenticated = false;
      state.loading = false;
    },
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

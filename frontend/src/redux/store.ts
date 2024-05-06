import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { filesSlice } from "./slices/filesSlices";

export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        files: filesSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
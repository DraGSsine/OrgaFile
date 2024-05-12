import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { filesSlice } from "./slices/filesSlices";
import { landingSlice } from "./slices/landingSlice";
import { foldersSlice } from './slices/foldersSlice';

export const base_url = "http://localhost:9010/"
export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        files: filesSlice.reducer,
        landing: landingSlice.reducer,
        folders: foldersSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
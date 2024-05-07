import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { filesSlice } from "./slices/filesSlices";
import { landingSlice } from "./slices/landingSlice";
export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        files: filesSlice.reducer,
        landing: landingSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
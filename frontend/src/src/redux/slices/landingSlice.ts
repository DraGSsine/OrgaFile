import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: "Step 1",
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});

export const { setActiveStep } = landingSlice.actions;

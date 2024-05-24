import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";

export interface PaymentState {
  checkoutSession: any;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  checkoutSession: null,
  loading: false,
  error: null,
};

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async ({price_id}:{price_id:string}, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-checkout-session`,
        {
          price_id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return res.data;
    } catch (error:any) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckoutSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCheckoutSession.fulfilled, (state, action) => {
      state.loading = false;
      state.checkoutSession = action.payload;
      location.href = action.payload.url;
    });
    builder.addCase(createCheckoutSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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
  async ({priceId}:{priceId:string}, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-checkout-session`,
        {
            priceId: priceId,
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
    });
    builder.addCase(createCheckoutSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookies from "js-cookie";

export interface CheckoutSessionType {
  checkoutSession: any;
  loading: boolean;
  error: string | null;
}

export interface CheckSubscriptionType {
  isSubscribed: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: {
  session: CheckoutSessionType;
  subscription: CheckSubscriptionType;
} = {
  session: {
    checkoutSession: null,
    loading: false,
    error: null,
  },
  subscription: {
    isSubscribed: false,
    loading: false,
    error: null,
  },
};

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (_, { rejectWithValue }) => {
    const plan = cookies.get("plan");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-checkout-session`,
        {plan},
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkSubscription = createAsyncThunk(
  "payment/checkSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/check-subscription`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.session.loading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, { payload }) => {
        state.session.loading = false;
        state.session.checkoutSession = payload;
      })
      .addCase(createCheckoutSession.rejected, (state, { payload }) => {
        state.session.loading = false;
        state.session.error = payload as string;
      })
      .addCase(checkSubscription.pending, (state) => {
        state.subscription.loading = true;
      })
      .addCase(checkSubscription.fulfilled, (state, { payload }) => {
        state.subscription.loading = false;
        state.subscription.isSubscribed = payload.isSubscribed;
      })
      .addCase(checkSubscription.rejected, (state, { payload }) => {
        state.subscription.loading = false;
        state.subscription.error = payload as string;
      });
  },
});

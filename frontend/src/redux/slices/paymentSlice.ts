import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    const plan = localStorage.getItem("plan") || "standard";
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/payment/create-checkout-session`,
        { plan },
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

export const renewSubscription = createAsyncThunk(
  "payment/renewSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/payment/renew-subscription`,
        {},
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
        `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/payment/check-subscription`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: any) {
      console.log(" error.response.data.message", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const cancelSubscription = createAsyncThunk("payment/cancelSubscription", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/payment/cancel-subscription`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
  catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
}
);

export const mangeBilling = createAsyncThunk("payment/manageBilling", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/payment/manage-billing`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
  catch (error: any) {
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
      .addCase(checkSubscription.rejected, (state) => {
        state.subscription.loading = false;
        state.subscription.error = "Error Processing the Payment";
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.subscription.loading = true;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.subscription.loading = false;
        state.subscription.isSubscribed = false;
      })
      .addCase(cancelSubscription.rejected, (state) => {
        state.subscription.loading = false;
        state.subscription.error = "Error Processing the Payment";
      })
      .addCase(renewSubscription.pending, (state) => {
        state.subscription.loading = true;
      })
      .addCase(renewSubscription.fulfilled, (state) => {
        state.subscription.loading = false;
        state.subscription.isSubscribed = true;
      })
      .addCase(renewSubscription.rejected, (state) => {
        state.subscription.loading = false;
        state.subscription.error = "Error Processing the Payment";
      })
      .addCase(mangeBilling.pending, (state) => {
        state.subscription.loading = true;
      })
      .addCase(mangeBilling.fulfilled, (state) => {
        state.subscription.loading = false;
      })
      .addCase(mangeBilling.rejected, (state) => {
        state.subscription.loading = false;
        state.subscription.error = "Error Processing the Payment";
      });
  },
});

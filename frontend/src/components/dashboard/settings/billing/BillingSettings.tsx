"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PaymentHistoryCard } from "./PaymentHistoryCard";
import { AvailablePlansCard } from "./AvailablePlansCard";

export function BillingSettings() {

  return (
    <div className="px-2 xl:px-10 space-y-2 pt-2 2xl:gap-5 2xl:py-6 overflow-y-scroll h-full flex flex-col">
      <div className="flex gap-1 2xl:gap-6 flex-grow flex-col">
        <CurrentPlanCard />
        <PaymentHistoryCard />
      </div>
    </div>
  );
}
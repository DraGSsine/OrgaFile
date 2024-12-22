
"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { manageBilling } from "@/redux/slices/paymentSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { CreditCardIcon } from "hugeicons-react";
import { formatDateForInvoice } from "@/helpers/helpers";
import { cn } from "@nextui-org/react";

export function CurrentPlanCard() {
  const { plan, subscriptionEnds, price } = useSelector(
    (state: RootState) => state.auth.userInformation
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onManageBilling = async () => {
    try {
      setLoading(true);
      const action = await dispatch(manageBilling());
      if (manageBilling.fulfilled.match(action)) {
        router.push(action.payload.url);
      }
    } catch (error) {
      toast.error("An error occurred while managing your subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-4/12 overflow-hidden rounded-xl border bg-gray-50 ">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-primary/10 p-3">
            <CreditCardIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold tracking-tight text-xl">
              {plan}
            </h3>
            <p className="text-sm text-muted-foreground">
              Current Plan
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 p-6 pt-0">
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold tracking-tight">
              {price}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              /month
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Next billing date: {formatDateForInvoice(subscriptionEnds)}
          </p>
        </div>

        <button
          onClick={onManageBilling}
          disabled={loading}
          className={cn(
            "relative w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm",
            "transition-all duration-300 hover:bg-primary/90 hover:shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "active:scale-[0.98]"
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            </div>
          ) : (
            "Manage Subscription"
          )}
        </button>
      </div>
    </div>
  );
}
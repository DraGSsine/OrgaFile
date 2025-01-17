"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import cookies from "js-cookie";
import {
  cancelSubscription,
  createCheckoutSession,
  mangeBilling,
  renewSubscription,
} from "@/redux/slices/paymentSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { CreditCardIcon } from "hugeicons-react";
import { formatDateForInvoice } from "@/lib/helpers";
import { Button } from "@nextui-org/button";
import { updateUserInfo } from "@/redux/slices/authSlice";
import { subscribeStatus } from "@/types/types";

interface BillingInfoProps {
  nextBillingDate: string;
  lastFour: string;
}
export function CurrentPlanCard() {
  const { isLoading, userInformation } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    status,
    plan,
    subscriptionEnds,
    price,
    currency,
    cardBrand,
    lastFourDigits,
  } = userInformation;
  const [renewLoading, setRenewLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [upgradePlanLoading, setUpgradePlanLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cancelSubs = async () => {
    try {
      setCancelLoading(true);
      const action = await dispatch(cancelSubscription());
      if (cancelSubscription.fulfilled.match(action)) {
        toast.success(action.payload.message);
        dispatch(updateUserInfo({ status: "canceled", isSubscribed: false }));
      }
    } catch (error) {
      toast.error("An error occurred while managing your subscription");
    } finally {
      setCancelLoading(false);
    }
  };

  const renewSubs = async () => {
    try {
      setRenewLoading(true);
      const action = await dispatch(renewSubscription());
      if (renewSubscription.fulfilled.match(action)) {
        toast.success(action.payload.message);
        dispatch(updateUserInfo({ status: "active", isSubscribed: true }));
      }
    } catch (error) {
      toast.error("An error occurred while managing your subscription");
    } finally {
      setRenewLoading(false);
    }
  };

  const onManageBilling = async () => {
    setBillingLoading(true);
    try {
      const action = await dispatch(mangeBilling());
      if (mangeBilling.fulfilled.match(action)) {
        router.push(action.payload.url);
        toast.success(action.payload.message);
      }
    } catch (error) {
      toast.error("An error occurred while managing your subscription");
    } finally {
      setBillingLoading(false);
    }
  };

  const upgradePlan = async () => {
    setUpgradePlanLoading(true);
    try {
      const plan = cookies.get("plan") || "Pro";
      const actoin = await dispatch(createCheckoutSession(plan));
      if (createCheckoutSession.fulfilled.match(actoin)) {
        router.push(actoin.payload.url);
        toast.success("Redirecting to stripe portal");
      }
    } catch (error) {
      toast.error("An error occurred while managing your subscription");
    } finally {
      setUpgradePlanLoading(false);
    }
  };
  return (
    <div className="overflow-hidden col-start-1 col-end-5 rounded-xl bg-white shadow-sm ring-1 ring-gray-200 flex flex-col justify-between ">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className=" gap-3 flex items-center">
            <div className="rounded-full bg-primary/10 p-3">
              <CreditCardIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Current Plan
              </h3>
              <p className="mt-1 text-sm text-gray-500 hidden 2xl:block ">
                You are currently on the {plan} plan
              </p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary-color">
              {price}$
            </span>
            <span className="ml-1 text-gray-500">/month</span>
          </div>

          <BillingInfo
            nextBillingDate={formatDateForInvoice(subscriptionEnds)}
            lastFour={lastFourDigits}
          />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between gap-4">
          {status === "active" && (
            <>
              <Button
                isLoading={billingLoading}
                onClick={onManageBilling}
                className="flex-1 rounded-lg bg-primary-color px-4 py-2 text-sm font-semibold text-white hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
              >
                Stripe Portal
              </Button>
              <Button
                isLoading={cancelLoading}
                onClick={cancelSubs}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
              >
                Cancel Plan
              </Button>
            </>
          )}
          {status === "canceled" && (
            <Button
              isLoading={renewLoading}
              onClick={renewSubs}
              className="w-full rounded-lg bg-primary-color px-4 py-2 text-sm font-semibold text-white hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
            >
              Reactivate Subscription
            </Button>
          )}

          {status === "inactive" ||
            (status == "ended" && (
              <Button
                isLoading={upgradePlanLoading}
                onClick={upgradePlan}
                className="w-full rounded-lg bg-primary-color px-4 py-2 text-sm font-semibold text-white hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2"
              >
                Upgrade Plan
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: subscribeStatus }) {
  const styles = {
    active: "bg-green-100 text-green-800",
    canceled: "bg-gray-100 text-gray-800",
    inactive: "bg-yellow-100 text-yellow-800",
    ended: "bg-red-100 text-red-800",
  };

  const labels = {
    active: "Active",
    canceled: "Canceled",
    inactive: "Inactive",
    ended: "Ended",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export function BillingInfo({ nextBillingDate, lastFour }: BillingInfoProps) {
  return (
    <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1.5">
        <CreditCardIcon className="h-4 w-4" />
        <span>•••• {lastFour}</span>
      </div>
      <div className="h-1 w-1 rounded-full bg-gray-300" />
      <span>Next billing date: {nextBillingDate}</span>
    </div>
  );
}

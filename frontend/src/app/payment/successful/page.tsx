"use client";
import { checkSubscription } from "@/redux/slices/paymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import {
  CancelCircleIcon,
  CheckmarkCircle01Icon,
  Loading02Icon,
  TickDouble01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const { subscription } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    dispatch(checkSubscription());
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {subscription.loading && (
        <>
          <div className="bg-gray-100 rounded-full p-4 text-primary-color ">
            <Loading02Icon className="h-8 w-8 animate-spin" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Processing payment</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait while we process your payment.
            </p>
          </div>
        </>
      )}
      {subscription.error && (
        <>
          <div className="bg-red-100 rounded-full p-4 text-red-500">
            <CancelCircleIcon className="h-8 w-8" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Payment Failed</h1>
            <p className="text-gray-500 dark:text-gray-400">
              we couldn&apos;t process your payment. Please try again.
            </p>
          </div>
        </>
      )}
      {
       subscription.isSubscribed && <>
          <div className="bg-green-100 rounded-full p-4 text-green-500">
            <CheckmarkCircle01Icon className="h-8 w-8" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Congratulations, your payment was processed successfully.
            </p>
          </div>
        </>
      }
      <Link className=" w-[200px]" href="/dashboard">
        <Button color="primary" className="w-full max-w-xs">
          Continue
        </Button>
      </Link>
    </div>
  );
}

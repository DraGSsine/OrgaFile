"use client";
import { checkSubscription } from "@/redux/slices/paymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const {subscription} = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    dispatch(checkSubscription())
    console.log(subscription)
  },[]);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="bg-green-100 rounded-full p-4 text-green-500">
        <CheckIcon className="h-8 w-8" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Payment Successful</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Congratulations, your payment was processed successfully.
        </p>
      </div>
      <Link className=" w-[200px]" href="/dashboard">
        <Button color="primary" className="w-full max-w-xs">
          Continue
        </Button>
      </Link>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

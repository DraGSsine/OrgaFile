"use client";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageBilling = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkoutSession } = useSelector((state: RootState) => state.payment);
  const mangePlan = () => {
    dispatch(createCheckoutSession({ price_id: "" }));
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Manage Your Billing
      </h1>
      <p className=" text-gray-600 mb-6">
        Take control of your billing plans and make the most of our services.
      </p>
      <div className="flex">
        <Button onClick={mangePlan} variant="bordered" color="warning" className="px-6 py-3">
          Manage My Bill
        </Button>
      </div>
    </div>
  );
};

export default ManageBilling;

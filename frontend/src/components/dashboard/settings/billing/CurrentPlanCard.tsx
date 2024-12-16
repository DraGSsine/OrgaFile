"use client";

import { formatDateForInvoice } from "@/helpers/helpers";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardBody, CardHeader, Button, cn } from "@nextui-org/react";
import axios from "axios";
import { CreditCardIcon } from "hugeicons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SubscriptionCardProps {
  price: string;
  billingDate: string;
  planName: string;
  description?: string;
  onManageBilling?: () => void;
  className?: string;
}

export function CurrentPlanCard() {
  const { checkoutSession } = useSelector((state: RootState) => state.payment.session);
  const {plan,subscriptionEnds,price} = useSelector((state: RootState) => state.auth.userInformation);
  const dispatch = useDispatch<AppDispatch>();

  const onManageBilling = () => {
    dispatch(createCheckoutSession()).then((action) => {
      if (createCheckoutSession.fulfilled.match(action)) {
        window.location.href = checkoutSession.url;
      }
    }
    );
  };

  return (
    <Card className="w-full max-w-sm"
    >
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-primary/10 p-2">
            <CreditCardIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold leading-none tracking-tight">
              {plan}
            </h3>
            <p className="text-sm text-muted-foreground">
              {`Current Plan`}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">
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
        <Button
          color="primary"
          className="w-full transition-all duration-300 hover:scale-[1.02]"
          onClick={onManageBilling}
        >
          Manage Subscription
        </Button>
      </CardBody>
    </Card>
  );
}
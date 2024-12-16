"use client";

import { formatDateForInvoice } from "@/helpers/helpers";
import { RootState } from "@/redux/store";
import { Transaction } from "@/types/types";
import { Card, CardBody, CardHeader, Button, cn } from "@nextui-org/react";
import { Invoice02Icon } from "hugeicons-react";
import { useSelector } from "react-redux";




export function PaymentHistoryCard() {
  const transactions:Transaction[] = useSelector((state:RootState) => state.auth.userInformation.subscriptionHistory);
  
  return (
    <Card className="w-full flex-grow ">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Invoice02Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold leading-none tracking-tight">
              Payment History
            </h3>
            <p className="text-sm text-muted-foreground">
              View your recent transactions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <TransactionList transactions={transactions} />
      </CardBody>
    </Card>
  );
}


export function TransactionList({ transactions }:{transactions:Transaction[]}) {
  return (
    <div className="space-y-2">
      {transactions?.map((transaction, index) => (
        <div
          key={`${transaction.createdAt}-${index}`}
          className="flex justify-between py-2 border-b last:border-none border-border transition-colors hover:bg-muted/50"
        >
          <span className="text-sm text-muted-foreground">{formatDateForInvoice(transaction.createdAt)}</span>
          <span className="font-medium">${transaction.price}</span>
        </div>
      ))}
    </div>
  );
}
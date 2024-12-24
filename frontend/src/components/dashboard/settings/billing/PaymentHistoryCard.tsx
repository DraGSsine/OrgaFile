"use client";
import { formatCurrency, formatDateForInvoice, getPaymentCardSvg } from "@/helpers/helpers";
import { RootState } from "@/redux/store";
import { Transaction } from "@/types/types";
import { cn } from "@nextui-org/react";
import { Invoice01Icon, Loading01Icon} from "hugeicons-react";
import { useSelector } from "react-redux";
import { CheckmarkCircle01Icon, CancelCircleIcon, Alert01Icon } from "hugeicons-react";
import Image from "next/image";


const statusConfig = (status: string) => {
  switch (status) {
    case "paid":
      return {
        label: "Paid",
        icon: CheckmarkCircle01Icon,
        className: "text-success/10 text-success",
      };
    case "failed":
      return {
        label: "Failed",
        icon: CancelCircleIcon,
        className: "text-error/10 text-error",
      };
    case "pending":
      return {
        label: "Pending",
        icon: Alert01Icon,
        className: "text-warning/10 text-warning",
      };
    default:
      return {
        label: "Draft",
        icon: Loading01Icon,
        className: "text-muted/10 text-muted",
      };
  }
}



export function PaymentHistoryCard() {
  const transactions: Transaction[] = useSelector((state: RootState) => state.auth.userInformation.subscriptionHistory);
  return (
    <div className="w-full flex-grow overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 px-1 lg:px-6 py-4 bg-muted/50 bg-[#e7e8e9] text-gray-500 overflow-hidden">
          <div className="text-sm font-medium text-muted-foreground lg:pl-10 col-span-2">Transaction</div>
          <div className="text-sm font-medium text-muted-foreground text-center">Date</div>
          <div className="text-sm font-medium text-muted-foreground text-center">Card</div>
          <div className="text-sm font-medium text-muted-foreground text-center">Amount</div>
          <div className="text-sm font-medium text-muted-foreground text-center">Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {transactions?.map((transaction, index) => {
            const StatusIcon = statusConfig(transaction.status).icon;

            return (
              <div
                key={`${transaction.startDate}-${index}`}
                className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                {/* Transaction Info */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Invoice01Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.plan}</p>
                    <p className="text-sm text-muted-foreground">
                      ****{transaction.lastFourDigits}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="self-center text-sm text-muted-foreground  text-center">
                  {formatDateForInvoice(transaction.startDate)}
                </div>

                {/* Payment Method */}
                <div className="self-center text-sm text-muted-foreground flex justify-center items-center">
                  <Image src={getPaymentCardSvg(transaction.cardBrand)} alt={transaction.cardBrand} width={30} height={30} />
                </div>

                {/* Amount */}
                <div className="self-center font-medium  text-center">
                  {formatCurrency(transaction.price, transaction.currency)}
                </div>

                {/* Status */}
                <div className="self-center  text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                      statusConfig(transaction.status).className
                    )}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusConfig(transaction.status).label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}
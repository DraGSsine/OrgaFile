"use client";

import { UsageCardProps } from "@/types/types";
import { Card, CardBody, cn } from "@nextui-org/react";
import { ProgressBar } from "./ProgressBar";


export function UsageCard({
  title,
  icon,
  iconColor,
  iconBgColor,
  value,
  max,
  label,
  progressColor,
  isLoading,
}: UsageCardProps) {
  return (
    <Card 
      className="w-full"
      shadow="sm"
      radius="lg"
    >
      <CardBody className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              iconBgColor
            )}>
              <div className={cn(
                "w-6 h-6",
                iconColor
              )}>{icon}</div>
            </div>
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <ProgressBar
            isLoading={isLoading}
            value={value}
            max={max}
            label={label}
            color={progressColor}
          />
        </div>
      </CardBody>
    </Card>
  );
}
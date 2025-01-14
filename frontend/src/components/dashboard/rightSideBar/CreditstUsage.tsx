import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

// Define the types if not already imported
type UsageCardProps = {
  title: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  progressColor?: string;
  label: string;
  brogressColor: string;
};

const getStatusColor = (percentage: number): string => {
  if (isNaN(percentage)) return "bg-gray-400";
  if (percentage >= 80) return "bg-red-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-green-500";
};

const getBackgroundColor = (percentage: number, deafult: string): string => {
  if (isNaN(percentage)) return "bg-gray-40";
  if (percentage >= 80) return "bg-red-50";
  if (percentage >= 60) return "bg-yellow-50";
  return deafult;
};

const getTextColor = (percentage: number, deafult: string): string => {
  if (isNaN(percentage)) return "text-gray-400";
  if (percentage >= 80) return "text-red-500";
  if (percentage >= 60) return "text-yellow-500";
  return deafult;
};

const getColor = (percentage: number, deafult: string): any => {
  if (isNaN(percentage)) return "deafult";
  if (percentage >= 80) return "danger";
  if (percentage >= 60) return "warning";
  return deafult;
};

export function UsageCard({
  title,
  value = 0,
  max = 100,
  icon,
  iconColor,
  iconBgColor,
  progressColor,
  label,
  brogressColor,
}: UsageCardProps) {
  // Handle division by zero and negative numbers
  const safeMax = Math.max(max, 1);
  const safeValue = Math.max(0, Math.min(value, safeMax));
  const percentage = Math.round((safeValue / safeMax) * 100);

  const status = getStatusColor(percentage);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div
          className={`rounded-lg p-2 ${getBackgroundColor(
            percentage,
            iconBgColor
          )}`}
        >
          <div className={getTextColor(percentage, iconColor)}>{icon}</div>
        </div>
        <div className="text-sm font-medium">{title}</div>
      </CardHeader>
      <CardBody>
        <ProgressBar
          value={percentage}
          className={`h-2 ${progressColor || status}`}
          label={label}
          max={100}
          color={getColor(percentage, brogressColor)}
        />
      </CardBody>
    </Card>
  );
}

export default UsageCard;

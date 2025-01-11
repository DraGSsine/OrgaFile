import { UsageCardProps } from "@/types/types";
import {
  Card,
  CardBody,
  Button,
  Progress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import {
  ChartBarLineIcon,
  HardDriveIcon,
  MoreVerticalCircle01Icon,
} from "hugeicons-react";

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

const getStatusColor = (percentage: number): "good" | "warn" | "danger" => {
  if (percentage >= 80) return "danger";
  if (percentage >= 60) return "warn";
  return "good";
};

export function UsageCard({
  title,
  value,
  max,
  iconColor,
  iconBgColor,
  progressColor,
  icon,
}: UsageCardProps) {
  const percentage = ((value / max) * 100).toFixed(2);
  const status = getStatusColor(+percentage);
  return (
    <Card className="flex flex-col border border-transparent p-4 dark:border-default-100">
      <div
        className={` w-8 h-8 flex items-center justify-center rounded-lg ${iconBgColor}`}
      >
        {status === "good" ? (
          <div className={`${iconBgColor} ${iconColor}`}>{icon}</div>
        ) : status === "warn" ? (
          <div className="text-warning-500">{icon}</div>
        ) : (
          <div className="text-danger-500">{icon}</div>
        )}
      </div>

      <div className="pt-1">
        <dt className="my-2 text-sm font-medium text-default-500">{title}</dt>
        <dd className="text-2xl font-semibold text-default-700">
          {percentage}%
        </dd>
      </div>
      <Progress
        aria-label="status"
        className="mt-2"
        color={
          status === "good"
            ? progressColor
            : status === "warn"
            ? "warning"
            : "danger"
        }
        value={+percentage}
      />
    </Card>
  );
}

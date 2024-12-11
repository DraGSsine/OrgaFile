"use client";

import { StorageProgressProps } from "@/types/types";
import { Progress, Skeleton } from "@nextui-org/react";


export function ProgressBar({
  isLoading,
  value,
  max,
  label,
  color = "primary",
  className,
}: StorageProgressProps) {
  if (isLoading) {
    return <ProgressSkeleton />;
  }

  const percentage = Math.round((value / max) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-default-500">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <Progress
        size="sm"
        radius="full"
        value={percentage}
        color={color}
        className={className}
        aria-label="Usage progress"
        classNames={{
          track: "drop-shadow-sm",
          indicator: "bg-gradient-to-r",
        }}
      />
    </div>
  );
}

function ProgressSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24 rounded-lg" />
        <Skeleton className="h-4 w-10 rounded-lg" />
      </div>
      <Skeleton className="h-2 w-full rounded-lg" />
    </div>
  );
}
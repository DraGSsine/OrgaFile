"use client";
import { Progress, Skeleton } from '@nextui-org/react';
import React from 'react';

type StorageProgressProps = {
  isLoading?: boolean;
  value: number;
  max: number;
  label: string;
  color?: "primary" | "success" | "warning" | "default" | "secondary" | "danger";
  className?: string;
};

export function ProgressBar({
  isLoading = false,
  value = 0,
  max = 100,
  label,
  color = 'primary',
  className,
}: StorageProgressProps) {
  if (isLoading) {
    return <ProgressSkeleton />;
  }

  // Handle edge cases and invalid numbers
  const safeMax = Math.max(max, 1); // Prevent division by zero
  const safeValue = Math.max(0, Math.min(value, safeMax)); // Clamp value between 0 and max
  const percentage = Math.round((safeValue / safeMax) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span>{!isNaN(percentage) ? `${percentage}%` : 'N/A'}</span>
      </div>
      <Progress
        value={isNaN(percentage) ? 0 : percentage}
        className={`h-2 ${className}`}
        aria-label={`${label} progress`}
        color={color}
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

export default ProgressBar;
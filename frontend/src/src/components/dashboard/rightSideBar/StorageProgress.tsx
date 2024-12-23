import { StorageProgressProps } from "@/types/types";
import { Progress, Skeleton } from "@nextui-org/react";

export function StorageProgress({
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
    <div className="space-y-2 ">
      <div className="flex justify-between text-sm text-default-500">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <Progress
        value={percentage}
        color={color}
        className={className}
        aria-label="Storage progress"
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

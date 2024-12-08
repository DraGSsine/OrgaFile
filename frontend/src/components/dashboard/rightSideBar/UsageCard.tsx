import { Card, CardBody, Progress, Skeleton, NextUIProvider } from "@nextui-org/react";
import { Cloud, Server } from "lucide-react";

// Progress Skeleton Component
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

// Storage Progress Component
interface StorageProgressProps {
  isLoading: boolean;
  value: number;
  max: number;
  label: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

function StorageProgress({ 
  isLoading, 
  value, 
  max, 
  label, 
  color = "primary",
  className 
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
        value={percentage}
        color={color}
        className={className}
        aria-label="Storage progress"
      />
    </div>
  );
}


interface StorageCardProps {
  isLoading: boolean;
  storageLimit: number;
  storageUsed: number;
}

export function StorageCard({ isLoading, storageLimit, storageUsed }: StorageCardProps) {
  return (
    <Card 
      className="w-full h-52"
      classNames={{
        base: "bg-gradient-to-br rounded-lg  transition-transform",
      }}
    >
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-primary-100/50 dark:bg-primary-900/20 w-fit p-3 rounded-lg">
            <Cloud className="w-7 h-7 text-primary-500" />
          </div>
          <h2 className="font-semibold text-xl mt-4">Cloud Storage</h2>
        </div>
        <StorageProgress
          isLoading={isLoading}
          value={storageUsed}
          max={storageLimit}
          label={`${storageUsed.toString().split(".")[0]}GB of ${storageLimit}GB`}
          color="primary"
        />
      </CardBody>
    </Card>
  );
}

// Usage Card Component
interface UsageCardProps {
  isLoading: boolean;
  requestLimit: number;
  requestUsed: number;
}

export function UsageCard({ isLoading, requestLimit, requestUsed }: UsageCardProps) {
  return (
    <Card 
      className="w-full h-52"
      classNames={{
        base: "bg-gradient-to-br rounded-lg  transition-transform",
      }}
    >
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-success-100/50 dark:bg-success-900/20 w-fit p-3 rounded-lg">
            <Server className="w-7 h-7 text-success-500" />
          </div>
          <h2 className="font-semibold text-xl mt-4">Monthly Usage</h2>
        </div>
        <StorageProgress
          isLoading={isLoading}
          value={requestUsed}
          max={requestLimit}
          label={`${requestUsed} of ${requestLimit} requests`}
          color="success"
        />
      </CardBody>
    </Card>
  );
}
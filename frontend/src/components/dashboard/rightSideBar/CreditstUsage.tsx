
import { UsageCardProps } from "@/types/types";
import { cn } from "@nextui-org/react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

export function UsageCard({
  title,
  value,
  max,
  label,
  progressColor,
  icon,
  iconColor,
  iconBgColor,
  isLoading,
}: UsageCardProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800",
      "bg-white dark:bg-gray-900 shadow-sm transition-all duration-200 hover:shadow-md",
      isLoading && "animate-pulse"
    )}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={cn(
            "rounded-lg p-2.5",
            iconColor,
            iconBgColor
          )}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatTotal(value)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {label}
            </span>
          </div>
          <div className="relative w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                barSize={8}
                data={[{ value: percentage }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={12}
                  fill={progressColor}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { UsageCardProps } from "@/types/types";
import {
  Card,
  cn,
} from "@nextui-org/react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
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
  return (
    <Card
      className={cn(
        "h-[240px] w-[90%] border border-transparent dark:border-default-100 flex flex-col "
      )}
    >
      <div className="flex flex-col justify-center p-4 pb-0">
        <div className="flex items-center gap-x-2  ">
          <div className={` rounded-lg p-1 ${iconColor} ${iconBgColor}`}>
            {icon}
          </div>
          <dt>
            <h3 className="text-small font-medium text-default-500">{title}</h3>
          </dt>
        </div>
      </div>
      <div className="flex flex-grow gap-x-3">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none p-0 "
          width="100%"
        >
          <RadialBarChart
            barSize={10}
            cx="50%"
            cy="50%"
            data={[{ value }]}
            endAngle={-270}
            innerRadius={90}
            outerRadius={70}
            startAngle={90}
          >
            <PolarAngleAxis
              angleAxisId={0}
              domain={[0, max]}
              tick={false}
              type="number"
            />
            <RadialBar
              angleAxisId={0}
              animationDuration={1000}
              animationEasing="ease"
              background={{
                fill: "hsl(var(--nextui-default-100))",
              }}
              cornerRadius={12}
              dataKey="value"
            >
              <Cell fill={progressColor} />
            </RadialBar>
            <g>
              <text textAnchor="middle" x="50%" y="48%">
                <tspan
                  className="fill-default-500 text-tiny"
                  dy="-0.5em"
                  x="50%"
                >
                  {label}
                </tspan>
                <tspan
                  className="fill-foreground text-medium font-semibold"
                  dy="1.5em"
                  x="50%"
                >
                  {formatTotal(max)}
                </tspan>
              </text>
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

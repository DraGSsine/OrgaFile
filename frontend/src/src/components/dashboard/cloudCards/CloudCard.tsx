"use client";

import { Card, CardBody, Progress } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileFormat } from "@/types/types";
import { formatFileSize } from "@/helpers/helpers";

interface CloudCardProps extends FileFormat {
  maxStorage: number;
  backGroundColor: string;
  barColor: string;
  icon: string;
}

export function CloudCard({
  name,
  numberOfFiles: filesNum,
  size: used,
  maxStorage,
  backGroundColor,
  barColor,
  icon,
}: CloudCardProps) {
  // convert bytes to GB
  const usedInGb = used / 1000000000;
  const percentage = (usedInGb / maxStorage) * 100;

  return (
    <Card disableAnimation disableRipple className="w-full" shadow="sm" isPressable isHoverable>
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${backGroundColor}`}>
              <Image
                src={icon}
                width={32}
                height={32}
                alt={name}
                className="w-8 h-8"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold capitalize">{name}</h3>
              <p className="text-default-500 text-sm">
                {filesNum.toLocaleString()} {filesNum === 1 ? "File" : "Files"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Progress
            value={percentage}
            size="sm"
            radius="sm"
            classNames={{
              base: backGroundColor,
              indicator: barColor,
            }}
          />
          <div className="flex justify-between text-sm text-default-500">
            <span>{formatFileSize(used)}</span>
            <span>{maxStorage} GB</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

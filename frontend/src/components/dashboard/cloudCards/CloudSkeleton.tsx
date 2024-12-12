"use client";

import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";

export function CloudSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-scrol h-[75%] py-1 px-2 overflow-y-scroll scrollbar-hide bg-white">
      {[1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
        >
          <Card className="w-full">
            <CardBody className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-24 rounded-lg" />
                  <Skeleton className="h-4 w-20 rounded-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-2 w-full rounded-lg" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 rounded-lg" />
                  <Skeleton className="h-4 w-16 rounded-lg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
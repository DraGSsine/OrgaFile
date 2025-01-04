"use client";

import { Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CloudDownloadIcon, Folder01Icon } from "hugeicons-react";

export function CloudSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 overflow-y-scrol h-[75%] py-1 px-2 overflow-y-scroll xl:scrollbar-hide ">
      {[1, 2, 3, 4, 5].map((item) => (
        <motion.div key={item}>
          <div className="  justify-between flex  flex-col bg-blue-100 p-6 animate-pulse rounded-lg fade-in">
            <div className="flex justify-between items-center mb-5">
              <Folder01Icon
                size={60}
                className="fill-primary-color text-primary-color"
              />
              <div className="bg-white rounded-full h-8 w-8"></div>
            </div>

            <div>
              <div className="bg-white h-5 w-20 rounded-full mb-1"></div>
              <div className="bg-white h-3 w-10 rounded-full"></div>
            </div>
            <div
              className="
        shadow-[0px_0px_1px_0px_#4299e1]  
          capitalize flex justify-between items-center bg-white rounded-full mt-4"
            >
              <div className="bg-white h-5 w-10 rounded-full"></div>
              <div className="bg-primary-color h-8 w-20 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

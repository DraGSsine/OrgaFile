"use client";

import { getColorBaseOnFormat, getFileImage } from "@/helpers/helpers";
import { loadClouInfo } from "@/redux/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudSkeleton } from "./CloudSkeleton";
import { CloudCard } from "./CloudCard";
import { motion } from "framer-motion";
import { HeaderPage } from "../HeaderPage";
import { HardDriveIcon } from "hugeicons-react";

export default function CloudCards() {
  const { data } = useSelector((state: RootState) => state.dashboard.cloudInfo);
  const { filesFormatInfo, storage } = data;
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadClouInfo());
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className=" row-start-1 row-end-5 py-5 ">
      <HeaderPage icon={<HardDriveIcon className="h-8 w-8 text-primary-500" />} title="Cloud Storage" description="View your cloud storage" />
      {loading ? (
        <CloudSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-scrol h-[75%] py-1 px-2 overflow-y-scroll xl:scrollbar-hide">
          {filesFormatInfo.map((item, index) => {
            const colors = getColorBaseOnFormat(item.name);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CloudCard
                  key={item.name}
                  {...item}
                  maxStorage={storage}
                  backGroundColor={colors.backGroundColor}
                  barColor={colors.barColor}
                  icon={getFileImage(item.name.toLowerCase())}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}


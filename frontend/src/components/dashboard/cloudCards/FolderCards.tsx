"use client";

import { useEffect, useState } from "react";
import { CloudSkeleton } from "./CloudSkeleton";
import { FolderCard } from "./FolderCard";
import { motion } from "framer-motion";
import { HeaderPage } from "../HeaderPage";
import { Folder01Icon, Folder02Icon, FolderOpenIcon, HardDriveIcon } from "hugeicons-react";
import axios from "axios";
import { FolderType } from "@/types/types";

export default function FolderCards() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<FolderType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEST_APP_URL}/api/dashboard/recent-folders`,
          {
            withCredentials: true,
          }
        );
        setFolders(response?.data?.folders ?? []);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" row-start-1 row-end-6 py-5 ">
      <HeaderPage
        icon={<Folder01Icon className="h-8 w-8 text-primary-color" />}
        title="Recent Folders"
        description="view last 5 folders"
      />
      {loading ? (
        <CloudSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-scrol h-[75%] py-1 px-2 overflow-y-scroll xl:scrollbar-hide ">
          {folders.length !== 0 ? (
            folders.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FolderCard folder={item} key={index} />
                </motion.div>
              );
            })
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-white shadow-small rounded-xl col-start-1 col-end-6">
            <div className="grid gap-4 w-60">
              <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
                <FolderOpenIcon
                  size={50}
                  className="fill-white text-primary-color text-1"
                />
              </div>
              <div>
                <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
                  No folders found
                </h2>
                <p className="text-center text-black text-sm font-normal leading-snug pb-4">
                  Upload Your files to show your organized folders
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}

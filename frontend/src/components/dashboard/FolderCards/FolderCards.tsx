"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeaderPage } from "../HeaderPage";
import axios from "axios";
import { FolderType } from "@/types/types";
import { Folder01Icon } from "hugeicons-react";
import { FolderComponent } from "../repository/Folder";
import { FolderSkeletonGrid } from "../repository/FolderSkeletonGrid";

export default function FolderCards() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<FolderType[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

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
      } finally {
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className=" row-start-1 row-end-8 py-6 ">
      <HeaderPage
        icon={<Folder01Icon className="h-8 w-8 text-[#4b81f7]" />}
        title="Recent Folders"
        description="View your last 5 folders"
      />

      {loading ? (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <FolderSkeletonGrid />
        </div>
      ) : (
        <div className="grid pb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-scrol h-[100%] px-2 overflow-y-scroll xl:scrollbar-hide ">
          {folders.length > 0 ? (
            folders.map((folder, index) => (
              <FolderComponent
                key={folder.folderId}
                folder={folder}
                index={index}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className=" bg-primary-color p-6 rounded-2xl">
                    <Folder01Icon className="h-12 w-12 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 bg-[#4b81f7] text-transparent bg-clip-text">
                  No folders yet
                </h2>

                <p className="text-gray-500 max-w-md mx-auto">
                  Upload your files to start organizing them into smart folders
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

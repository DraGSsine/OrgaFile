"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeaderPage } from "../HeaderPage";
import axios from "axios";
import { FolderType } from "@/types/types";
import { Folder01Icon, FolderOpenIcon } from "hugeicons-react";
import { FolderComponent } from "../repository/Folder";
import { FolderSkeletonGrid } from "../repository/FolderSkeletonGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function FolderCards() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const {isDeleted} = useSelector((state: RootState) => state.folders.deleteFolder);
  const {isFileUploaded} = useSelector((state: RootState) => state.files.uploadFileState);
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
        console.error(error);
      } finally {
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDeleted,isFileUploaded]);

  return (
    <div className=" row-start-1 row-end-8 py-6 ">
      <HeaderPage
        icon={<Folder01Icon className="h-8 w-8 text-[#4b81f7]" />}
        title="Recent Folders"
        description="View your last 4 folders"
      />

      {loading ? (
        <div className="grid pb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-scrol h-[100%] px-2 overflow-y-scroll xl:scrollbar-hide ">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full w-full rounded-lg bg-gradient-to-br from-white to-blue-50/50 border border-blue-100/50 flex items-center justify-center"
            >
              <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
                <FolderOpenIcon size={50} className="text-gray-300" />
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    No folders found
                  </h2>
                  <p className="text-sm text-gray-600">
                    Upload your files to show your organized folders
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

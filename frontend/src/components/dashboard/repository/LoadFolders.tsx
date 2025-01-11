"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FolderType } from "@/types/types";
import { AppDispatch, RootState } from "@/redux/store";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { FolderOpenIcon } from "hugeicons-react";
import { FolderComponent } from "./Folder";
import { FolderSkeletonGrid } from "./FolderSkeletonGrid";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isFileUploaded } = useSelector(
    (state: RootState) => state.files.uploadFileState
  );
  const { folders, isLoading } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    dispatch(loadFolders());
  }, [dispatch, isFileUploaded]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 500);
      return () => clearTimeout(timer);
    }
    setShowSkeleton(true);
  }, [isLoading]);

  return (
    <div className="h-full w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-max">
        {showSkeleton ? (
          <FolderSkeletonGrid />
        ) : folders.length === 0 ? (
          <EmptyState />
        ) : (
          <FolderGrid folders={folders} />
        )}
      </div>
    </div>
  );
};


const FolderGrid = ({ folders }: { folders: FolderType[] }) => (
  <>
    {folders.map((folder, index) => (
      <FolderComponent key={index} index={index} folder={folder} />
    ))}
  </>
);

const EmptyState = () => (
  <div className="col-span-full h-[calc(100vh-200px)] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
      <div className="w-20 h-20 rounded-full bg-gray-50 shadow-sm flex items-center justify-center">
        <FolderOpenIcon
          size={50}
          className="text-primary-color"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          No folders found
        </h2>
        <p className="text-sm text-gray-600">
          Upload your files to show your organized folders
        </p>
      </div>
    </div>
  </div>
);

const FolderLoadSkeleton = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-4"
  >
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    </div>
    <div className="space-y-3 flex-grow">
      <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
      </div>
    </div>
    <div className="w-full h-9 rounded-lg bg-gray-200 animate-pulse" />
  </motion.div>
);

export default LoadFolders;
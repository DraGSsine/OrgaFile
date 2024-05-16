"use client";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderComponent from "./Folder";
import { Folder } from "lucide-react";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders, isLoading } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );
  useEffect(() => {
    dispatch(loadFolders());
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6">
        <FolderLoadSkeleton />
        <FolderLoadSkeleton />
        <FolderLoadSkeleton />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-6">
      {folders.map((folder: FolderType) => (
        <FolderComponent key={folder.folderId} folder={folder} />
      ))}
    </div>
  );
};

export default LoadFolders;

const FolderLoadSkeleton = () => {
  return (
    <div className=" w-64 h-[230px] justify-between flex  flex-col bg-blue-50 p-6 rounded-2xl animate-pulse">
      <div className="flex justify-between items-center mb-5">
        <Folder size={60} className="fill-blue-500 stroke-blue-500" />
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
        <div className="bg-blue-500 h-8 w-20 rounded-full"></div>
      </div>
    </div>
  );
};

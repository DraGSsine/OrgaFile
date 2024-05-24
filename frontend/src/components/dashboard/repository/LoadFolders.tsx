"use client";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderComponent from "./Folder";
import { Folder, FolderOpen } from "lucide-react";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders, isLoading } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );
  useEffect(() => {
    dispatch(loadFolders());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <FolderLoadSkeleton key={i} />
        ))}
      </div>
    );
  } else if (folders.length === 0) {
    return (
      <div className=" h-full w-full flex items-center justify-center ">
        <div className="grid h-60 gap-4 w-60">
          <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
            <FolderOpen size={50} className="fill-white stroke-blue-500 stroke-1 " />
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

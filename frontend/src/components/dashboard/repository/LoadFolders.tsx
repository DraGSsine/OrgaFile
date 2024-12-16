"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FolderType } from "@/types/types";
import { AppDispatch, RootState } from "@/redux/store";
import { loadFolders } from "@/redux/slices/foldersSlice";
import FolderComponent from "./Folder";
import { Folder01Icon, FolderOpenIcon } from "hugeicons-react";

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
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [isLoading]);

  if (showSkeleton) {
    return (
      <div className=" max-h-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-scroll p-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <FolderLoadSkeleton key={i} />
        ))}
      </div>
    );
  } else if (folders.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="grid h-60 gap-4 w-60">
          <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
            <FolderOpenIcon
              size={50}
              className="fill-white text-blue-500 text-1"
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
    );
  }
  return (
    <div className="max-h-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-scroll p-2">
      {folders.map((folder: FolderType, index: number) => (
        <FolderComponent key={index} folder={folder} />
      ))}
    </div>
  );
};

export default LoadFolders;
const FolderLoadSkeleton = () => {
  return (
    <div className="  justify-between flex  flex-col bg-blue-100 p-6 animate-pulse rounded-lg fade-in">
      <div className="flex justify-between items-center mb-5">
        <Folder01Icon size={60} className="fill-blue-500 text-blue-500" />
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

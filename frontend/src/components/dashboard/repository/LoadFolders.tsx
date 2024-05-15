"use client";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderComponent from "./Folder";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders  } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );
  useEffect(() => {
    dispatch(loadFolders());
  }, []);
  return (
    <div className="flex flex-wrap gap-6">
      {folders.map((folder: FolderType) => (
        <FolderComponent key={folder.folderId}  folder={folder} />
      ))}
    </div>
  );
};

export default LoadFolders;



"use client";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudDownload, Folder } from "lucide-react";
import Link from "next/link";
import FolderComponent from "./Folder";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );
  useEffect(() => {
    dispatch(loadFolders());
    console.log(folders);
  }, []);

  return (
    <div className="flex flex-wrap gap-6">
      {folders.map((folder: FolderType) => (
        <FolderComponent key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default LoadFolders;



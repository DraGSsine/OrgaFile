"use client";
import TableFiles from "@/components/dashboard/files/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRecentFiles,
  resetFiles,
  setConfirmFileRemove,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const RecentFiles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recentFiles, removeFile, removeManyFiles, uploadFile } = useSelector(
    (state: RootState) => state.files
  );
  useEffect(() => {
    dispatch(loadRecentFiles());
    if (recentFiles.error) {
      toast.error("Failed to load files");
    }
    switch (true) {
      case removeFile.isFileDeleted:
        toast.success("File deleted successfully");
        dispatch(setConfirmFileRemove({ active: false, fileId: "" }));
        break;
      case removeManyFiles.isManyFileDeleted:
        toast.success("Files deleted successfully");
        break;
      case uploadFile.isFileUploaded:
        toast.success("Files uploaded successfully");
        break;
    }
    dispatch(resetFiles());
  }, [
    removeFile.isFileDeleted,
    removeManyFiles.isManyFileDeleted,
    uploadFile.isFileUploaded,
  ]);
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">Recent Files</h1>
      <TableFiles files={recentFiles.files} isLoading={recentFiles.isLoading} />
    </div>
  );
};

export default RecentFiles;

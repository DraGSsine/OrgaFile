"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRecentFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const recentFilesState = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    recentFilesState,
    removeFileState,
    uploadFileState,
  } = useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadRecentFiles());
    if (recentFilesState.error) {
      toast.error("Failed to load files");
    }
    switch (true) {
      case removeFileState.isFileDeleted && !removeFileState.isMany:
        toast.success("File deleted successfully");
        dispatch(setConfirmFileRemoveModal(false));
        break;
      case removeFileState.isMany:
        toast.success("Files deleted successfully");
        break;
      case uploadFileState.isFileUploaded:
        toast.success("Files uploaded successfully");
        break;
    }
    dispatch(resetFilesState());
  }, [
    removeFileState.isFileDeleted,
    uploadFileState.isFileUploaded,
  ]);
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">Recent Files</h1>
      <TableFiles
        maxRows={9}
        files={recentFilesState.files}
        isLoading={recentFilesState.isLoading}
        routeName="recentFiles"
      />
    </div>
  );
};

export default recentFilesState;

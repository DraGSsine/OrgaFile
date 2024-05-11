"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loadFilesState,
    removeFileState,
    uploadFileState,
  } = useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadAllFiles(null));
    if (loadFilesState.error) {
      toast.error("Failed to load files");
    }
    switch (true) {
      case !removeFileState.isMany && removeFileState.isFileDeleted:
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
      <h1 className=" font-medium text-2xl pl-2 pb-6 ">All Files</h1>
      <TableFiles
        maxRows={12}
        files={loadFilesState.files}
        isLoading={loadFilesState.isLoading}
        routeName="allFiles"
      />
    </div>
  );
};

export default page;

"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRemovedFiles,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadRemovedFilesState, removeFileState, restoreFileState,uploadFileState } =
    useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadRemovedFiles());
    if (loadRemovedFilesState.error) {
      toast.error("Failed to load files");
    }
    switch (true) {
      case removeFileState.isFileDeleted && removeFileState.files.length <= 1:
        toast.success("File deleted successfully");
        dispatch(setConfirmFileRemoveModal(false));
        break;
      case removeFileState.isMany:
        toast.success("Files deleted successfully");
        break;
    }
  }, [uploadFileState.isFileUploaded, removeFileState.isFileDeleted]);
  return (
    <div className=" flex flex-col h-full ">
      <h1 className="font-medium text-2xl pl-2 pb-6">My Trash</h1>
      <TableFiles
        maxRows={12}
        files={loadRemovedFilesState.files}
        isLoading={loadRemovedFilesState.isLoading}
        routeName="removedFiles"
      />
    </div>
  );
};

export default Page;

"use client";
import TableFiles from "@/components/dashboard/files/TableFiles";
import ConfirmDelete from "@/components/dashboard/ConfirmeDelete";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  resetFiles,
  setConfirmFileRemove,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadFiles, removeFile, removeManyFiles, uploadFile } = useSelector(
    (state: RootState) => state.files
  );
  useEffect(() => {
    dispatch(loadAllFiles(null));
    if (loadFiles.error) {
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
      <TableFiles files={loadFiles.files} isLoading={loadFiles.isLoading} />
    </div>
  );
};

export default page;

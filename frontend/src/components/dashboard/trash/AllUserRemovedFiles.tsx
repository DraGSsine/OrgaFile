"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import ConfirmDelete from "@/components/dashboard/ConfirmeDelete";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRemovedFiles,
  resetFiles,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";

const AllUserRemovedFiles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadRemovedFilesState, removeFileState } =
    useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadRemovedFiles());
    if (loadRemovedFilesState.error) {
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
    }
    dispatch(resetFiles());
  }, [removeFileState.isFileDeleted]);
  return (
    <div>
      <h1 className=" font-medium text-2xl pl-2 pb-6 ">All Files</h1>
      <TableFiles
        maxRows={12}
        files={loadRemovedFilesState.files}
        isLoading={loadRemovedFilesState.isLoading}
        routeName="removedFiles"
      />
    </div>
  );
};

export default AllUserRemovedFiles;

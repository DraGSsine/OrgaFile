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
import { loadOneFolder, resetFolderState } from "@/redux/slices/foldersSlice";
import { useParams } from "next/navigation";

const page = () => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { folder, error, isLoading } = useSelector(
    (state: RootState) => state.folders.loadOneFolder
  );
  const { removeFileState } = useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadOneFolder(id as string));
    if (error) {
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
    dispatch(resetFolderState());
  }, [removeFileState.isFileDeleted]);
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">Recent Files</h1>
      <TableFiles
        maxRows={9}
        files={folder?.files ?? []}
        isLoading={!folder?.files && true}
        routeName="recentFiles"
      />
    </div>
  );
};

export default page;

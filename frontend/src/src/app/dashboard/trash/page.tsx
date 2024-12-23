"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRemovedFiles,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";
import { HeaderPage } from "@/components/dashboard/HeaderPage";
import { Delete02Icon } from "hugeicons-react";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState(true);
  const {
    loadRemovedFilesState,
    removeFileState,
    restoreFileState,
    uploadFileState,
  } = useSelector((state: RootState) => state.files);
  useEffect(() => {
    dispatch(loadRemovedFiles());
    if (loadRemovedFilesState.error) {
      toast.error("Failed to load files");
      setIsLoading(false);
    }
    switch (true) {
      case removeFileState.isFileDeleted && removeFileState.files.length <= 1:
        toast.success("File deleted successfully");
        setIsLoading(false);
        break;
      case removeFileState.isMany:
        toast.success("Files deleted successfully");
        setIsLoading(false);
        break;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [
    uploadFileState.isFileUploaded,
    removeFileState.isFileDeleted,
    restoreFileState.fileRestored,
  ]);
  return (
    <div className=" h-full pt-5 grid grid-rows-12 ">
      <HeaderPage
        icon={<Delete02Icon className=" h-8 w-8 text-primary-500 " />}
        title="Deleted Files"
        description="Restore Your Deleted Files"
      />
      <TableFiles
        maxRows={11}
        files={loadRemovedFilesState.files}
        isLoading={isLoading}
        routeName="removedFiles"
      />
    </div>
  );
};

export default Page;

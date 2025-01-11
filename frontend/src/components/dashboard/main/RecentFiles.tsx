"use client";
import RecentFilesTable from "@/components/dashboard/TableFiles";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  loadRecentFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import { HeaderPage } from "../HeaderPage";
import { File02Icon } from "hugeicons-react";
import TableFiles from "@/components/dashboard/TableFiles";

const RecentUploadsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { recentFilesState, removeFileState, uploadFileState } = useSelector(
    (state: RootState) => state.files
  );

  useEffect(() => {
    const handleFileStates = () => {
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
        case uploadFileState.error:
          toast.error("Failed to upload files");
          console.error(uploadFileState.error);
          break;
      }
    };

    const LoadRecentFiles = () => {
      dispatch(loadRecentFiles());

      if (recentFilesState.error) {
        toast.error("Failed to load files");
        console.error(recentFilesState.error);
      }
    };

    LoadRecentFiles();
    handleFileStates();
    dispatch(resetFilesState());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearInterval(timer);
  }, [uploadFileState.isFileUploaded, removeFileState.isFileDeleted]);

  return (
    <div className=" row-start-9 row-end-25 h-full w-full">
      <div className=" h-full grid grid-rows-12 ">
        <HeaderPage
          icon={<File02Icon className="w-8 h-8 text-primary-color" />}
          title="Recent Uploads"
          description={`view last ${7} files`}
        />
        <TableFiles
          files={recentFilesState.files}
          isLoading={isLoading}
          maxRows={7}
          routeName="allFiles"
        />
      </div>
    </div>
  );
};

export default RecentUploadsPage;

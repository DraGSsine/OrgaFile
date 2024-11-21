"use client";
import RecentFilesTable from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  loadRecentFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";

const RecentUploadsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
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
  }, [uploadFileState.isFileUploaded, removeFileState.isFileDeleted]);


  return (
    <div className=" flex flex-col h-full " >
      <h1 className=" font-medium text-2xl pl-2 pb-6 "> Recent Uploads </h1>
      <RecentFilesTable
        maxRows={9}
        files={recentFilesState.files}
        isLoading={recentFilesState.isLoading}
        routeName="allFiles"
      />
    </div>
  );
};

export default RecentUploadsPage;

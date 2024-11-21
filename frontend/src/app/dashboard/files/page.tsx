"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";

const AllFilesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loadFilesState,
    removeFileState,
    uploadFileState,
  } = useSelector((state: RootState) => state.files);

  const LoadAllFiles = useCallback(() => {
    dispatch(loadAllFiles());

    if (loadFilesState.error) {
      toast.error("Failed to load files");
      console.error(loadFilesState.error); // Logging the error
    }
  }, [dispatch, loadFilesState.error]);

  // Calling functions in useEffect
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

    LoadAllFiles();
    handleFileStates();
    dispatch(resetFilesState());
  }, [
    removeFileState.isFileDeleted,
    removeFileState.isMany,
    uploadFileState.isFileUploaded,
    uploadFileState.error,
  ]);

  return (
    <div className=" h-full flex flex-col " >
      <h1 className=" font-medium text-2xl pl-2 pb-6 "> All Files </h1>
      <TableFiles
        maxRows={12}
        files={loadFilesState.files}
        isLoading={loadFilesState.isLoading}
        routeName="allFiles"
      />
    </div>
  );
};

export default AllFilesPage;

"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFiles,
  resetFilesState,
  setConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import { HeaderPage } from "@/components/dashboard/HeaderPage";
import { File01Icon, Files02Icon } from "hugeicons-react";

const AllFilesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { loadFilesState, removeFileState, uploadFileState } = useSelector(
    (state: RootState) => state.files
  );

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
    const timer = setTimeout(() => {
      setIsLoading(false);
    } , 500);
    return () => clearTimeout(timer);
  }, [uploadFileState.isFileUploaded, removeFileState.isFileDeleted]);


  return (
    <div className=" h-full pt-5 grid grid-rows-12 ">
      <HeaderPage icon={<File01Icon className=" h-8 w-8 text-primary-color" />} title="All Files" description="Discover All Your upladed files " />
      <TableFiles
        maxRows={10}
        files={loadFilesState.files}
        isLoading={isLoading}
        routeName="allFiles"
      />
    </div>
  );
};

export default AllFilesPage;

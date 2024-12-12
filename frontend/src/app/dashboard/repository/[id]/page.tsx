"use client";
import TableFiles from "@/components/dashboard/TableFiles";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmFileRemoveModal } from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import React from "react";
import { loadOneFolder, resetFolderState } from "@/redux/slices/foldersSlice";
import { useParams } from "next/navigation";
import { HeaderPage } from "@/components/dashboard/HeaderPage";
import { Folder02Icon } from "hugeicons-react";

const Page = () => {
  const { id } = useParams();
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
  }, [
    removeFileState.isFileDeleted,
    error,
    id,
    removeFileState.isMany,
    dispatch,
  ]);
  return (
    <div className=" pt-5 h-full flex flex-col ">
      <HeaderPage icon={<Folder02Icon className=" h-8 w-8 text-primary-500"/>} title={folder?.name!} description="your organized files" />
      <TableFiles
        maxRows={9}
        files={folder?.files ?? []}
        isLoading={!folder?.files && true}
        routeName="recentFiles"
      />
    </div>
  );
};

export default Page;

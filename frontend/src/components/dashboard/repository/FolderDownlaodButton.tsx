import {
  downloadFolder,
  setDownloadingFolder,
} from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { CloudDownloadIcon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { set, string } from "zod";

const FolderDownlaodButton = ({ folder }: { folder: FolderType }) => {
  const { isLoading, downloadingFolderId } = useSelector(
    (state: RootState) => state.folders.downloadFolder
  );
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading && downloadingFolderId.includes(folder.folderId)) {
    return <Spinner size="sm" />;
  }

  // downlaod fucntin

  async function HandleDownloadFolder() {
    dispatch(setDownloadingFolder(folder.folderId));

    toast.promise(
      dispatch(
        downloadFolder({ folderId: folder.folderId, folderName: folder.name })
      ),
      {
        loading: "Downloading...",
        success: "Downloaded successfully",
        error: "Failed to download",
      }
    );
  }

  return (
    <Button
      onClick={() => HandleDownloadFolder()}
      isIconOnly
      disableRipple
      className="bg-transparent hover:bg-transparent"
    >
      <CloudDownloadIcon size={22} strokeWidth={2.5} className=" text-blue-500" />
    </Button>
  );
};

export default FolderDownlaodButton;

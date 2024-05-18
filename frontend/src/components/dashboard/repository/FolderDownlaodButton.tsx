import { downloadFolder, setDownloadingFolder } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { CloudDownload, Download, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set, string } from "zod";

const FolderDownlaodButton = ({ folder }: { folder: FolderType }) => {
  const { isLoading, downloadingFolderId } = useSelector(
    (state: RootState) => state.folders.downloadFolder
  );
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading && downloadingFolderId.includes(folder.folderId)) {
    return <Spinner size="sm" />;
  }
  return (
    <Button
      onClick={() => {
        dispatch(setDownloadingFolder(folder.folderId));
        dispatch(
          downloadFolder({ folderId: folder.folderId, folderName: folder.name })
        );
      }}
      isIconOnly
      disableRipple
      className="bg-transparent hover:bg-transparent"
    >
      <CloudDownload size={22} strokeWidth={2.5} className=" stroke-blue-500" />
    </Button>
  );
};

export default FolderDownlaodButton;

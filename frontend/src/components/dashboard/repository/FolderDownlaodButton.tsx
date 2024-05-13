import { downloadFolder } from "@/redux/slices/foldersSlice";
import { AppDispatch } from "@/redux/store";
import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import { CloudDownload, Download, Link } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const FolderDownlaodButton = ({ folder }: { folder: FolderType }) => {
  const dispatch = useDispatch<AppDispatch>();
  //   const downloadFolder = () => {

  //   };
  return (
    <Button
      onClick={() => {
        dispatch(downloadFolder({folderId:folder.id,folderName:folder.name}));
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

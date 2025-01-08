"use client"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { FolderType } from "@/types/types";
import {
  ArrowDown03Icon,
  Delete02Icon,
  MoreVerticalCircle01Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import {
  deleteFolder,
  downloadFolder,
  setDownloadingFolder,
} from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function FolderSettings({ folder }: { folder: FolderType }) {
  const { isLoading, downloadingFolderId } = useSelector(
    (state: RootState) => state.folders.downloadFolder
  );
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading && downloadingFolderId.includes(folder.folderId)) {
    return <Spinner size="sm" />;
  }

  function handleAction({ key }: { key: string | number }) {
    if (key === "delete") {
      toast.promise(
        dispatch(deleteFolder(folder.folderId)),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        }
      );
    } else if (key === "download") {
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
  }
  return (
    <>
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="flat"
            disableAnimation
            className=" bg-zinc-100 "
            size="sm"
          >
            <MoreVerticalCircle01Icon size={18} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => handleAction({ key })}
        >
          <DropdownItem
            startContent={<ArrowDown03Icon size={20} />}
            key="download"
          >
            Download
          </DropdownItem>
          <DropdownItem
            startContent={<Delete02Icon size={20} />}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

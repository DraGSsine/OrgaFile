"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RouteNameType } from "@/types/types";
import {
  setConfirmFileRemoveModal,
  setRemoveFiles,
  restoreFile,
  downloadFile,
} from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import { ArrowDown03Icon, Delete02Icon, DeletePutBackIcon, MoreVerticalCircle01Icon } from "hugeicons-react";


const FilesSettings = ({
  fileId,
  routeName,
  fileName,
}: {
  fileId: string;
  routeName: RouteNameType;
  fileName: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleAction({ key }: { key: string | number }) {
    if (key === "delete") {
      console.log("delete");
      dispatch(setConfirmFileRemoveModal(true));
      dispatch(
        setRemoveFiles({
          files: [fileId],
          isPermanently: routeName === "removedFiles",
          isMany: false,
        })
      );
    }
    else if (key === "restore") {
      dispatch(restoreFile({fileId}));
    }
    else if (key === "downloadFile") {
      toast.promise(dispatch(downloadFile({fileId,fileName})), {
        loading: "Downloading...",
        success: "Downloaded successfully",
        error: "Failed to download",
      });
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
            key="downloadFile"
          >
            Download file
          </DropdownItem>
          {routeName === "removedFiles" ? (
            <DropdownItem startContent={<DeletePutBackIcon size={20} />} key="restore">
              Restore file
            </DropdownItem>
          ) : null as any}
          <DropdownItem
            startContent={<Delete02Icon size={20} />}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default FilesSettings;

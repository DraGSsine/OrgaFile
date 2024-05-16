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
import {
  ArchiveRestore,
  ArrowDownToLineIcon,
  Clipboard,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import { RouteNameType } from "@/types/types";
import {
  setConfirmFileRemoveModal,
  setRemoveFiles,
  restoreFile,
} from "@/redux/slices/filesSlices";

const FilesSettings = ({
  fileId,
  routeName,
}: {
  fileId: string;
  routeName: RouteNameType;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleAction({ key }: { key: string | number }) {
    if (key === "delete") {
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
            <EllipsisVertical size={18} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => handleAction({ key })}
        >
          <DropdownItem
            startContent={<ArrowDownToLineIcon size={20} />}
            key="new"
          >
            Download file
          </DropdownItem>
          {routeName === "removedFiles" ? (
            <DropdownItem startContent={<ArchiveRestore size={20} />} key="restore">
              Restore file
            </DropdownItem>
          ) : null as any}
          <DropdownItem
            startContent={<Trash2 size={20} />}
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

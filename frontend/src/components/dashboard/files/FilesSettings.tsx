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
  ArrowDownToLineIcon,
  Clipboard,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import { RouteNameType } from "@/types/types";
import {
  setConfirmFileRemoveModal,
  setRemoveFiles,
} from "@/redux/slices/filesSlices";
import { array } from "zod";

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
          isPremanently: routeName === "removedFiles",
          isMany: false,
        })
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
          <DropdownItem startContent={<Clipboard size={20} />} key="copy">
            Copy link
          </DropdownItem>
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

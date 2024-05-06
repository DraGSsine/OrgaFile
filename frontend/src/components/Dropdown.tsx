import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  Ellipsis,
} from "../../public/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteFile } from "@/redux/slices/filesSlices";
import ConfirmeDelete from "./dashboard/files/ConfirmeDelete";

export const DropDown = ({ fileId }: { fileId: string }) => {
  const { deleteFileId } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch<AppDispatch>();

  function handleAction({key,fileId,}: {key: string | number;fileId: string}) {
    if (key === "delete") {
      dispatch(deleteFile(fileId));
    }
  }
  return (
    <>
      <ConfirmeDelete/>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="flat"
            disableAnimation
            className=" bg-zinc-100 "
            size="sm"
          >
            <Ellipsis width={20} height={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => handleAction({ key, fileId })}
        >
          <DropdownItem startContent={<DownloadIcon />} key="new">
            Download file
          </DropdownItem>
          <DropdownItem startContent={<CopyIcon />} key="copy">
            Copy link
          </DropdownItem>
          <DropdownItem
            startContent={<DeleteIcon width={25} height={25} />}
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

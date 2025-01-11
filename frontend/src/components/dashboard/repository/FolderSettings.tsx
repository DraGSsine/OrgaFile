"use client";

import { 
  Button, 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownTrigger,
  Spinner
} from "@nextui-org/react";
import { MoreVerticalCircle01Icon, Delete02Icon, ArrowDown03Icon } from "hugeicons-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { 
  deleteFolder, 
  downloadFolder, 
  setDownloadingFolder 
} from "@/redux/slices/foldersSlice";

interface FolderType {
  folderId: string;
  name: string;
}

export default function FolderSettings({ folder }: { folder: FolderType }) {
  const { isLoading, downloadingFolderId } = useSelector(
    (state: RootState) => state.folders.downloadFolder
  );
  
  const { isLoading: isDeleting, deleteingFolderId } = useSelector(
    (state: RootState) => state.folders.deleteFolder
  );
  
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading && downloadingFolderId.includes(folder.folderId)) {
    return <Spinner size="sm" />;
  }

  function handleAction({ key }: { key: string }) {
    if (key === "delete") {
      toast.promise(dispatch(deleteFolder(folder.folderId)), {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Failed to delete",
      });
    } else if (key === "download") {
      dispatch(setDownloadingFolder(folder.folderId));
      toast.promise(
        dispatch(
          downloadFolder({
            folderId: folder.folderId,
            folderName: folder.name
          })
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
    <Dropdown>
      <DropdownTrigger>
        <Button 
          isIconOnly 
          variant="light"
          size="sm"
        >
          <MoreVerticalCircle01Icon size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Folder actions" 
        onAction={(key) => handleAction({ key })}
      >
        <DropdownItem
          key="download"
          startContent={<ArrowDown03Icon size={20} />}
        >
          Download
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<Delete02Icon size={20} />}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
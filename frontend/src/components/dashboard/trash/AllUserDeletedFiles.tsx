import React, { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import {
  FormatTheDate,
  bytesToMegaBytes,
  getFileImage,
} from "@/helpers/helpers";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteManyFiles, loadFiles, resetFiles, setConfirmFileDelete } from "@/redux/slices/filesSlices";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import FilesSettings from "./FilesSettings";

export default function AllUserDeletedFiles() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    files,
    isLoading,
    error,
    isFileDeleted,
    isManyFileDeleted,
    isFilesUploaded,
  } = useSelector((state: RootState) => state.files);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(files.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return files.slice(start, end);
  }, [page, files]);

  const removeSelectedKeys = () => {
    dispatch(deleteManyFiles(selectedKeys));
    setSelectedKeys(new Set([]));
  };

  useEffect(() => {
    dispatch(loadFiles(null));
    if (error) {
      toast.error("Failed to load files");
    }
    switch (true) {
      case isFileDeleted:
        toast.success("File deleted successfully");
        dispatch(setConfirmFileDelete(false))
        break;
      case isManyFileDeleted:
        toast.success("Files deleted successfully");
        break;
      case isFilesUploaded:
        toast.success("Files uploaded successfully");
        break;
    }
    dispatch(resetFiles())
  }, [isFileDeleted, isManyFileDeleted, isFilesUploaded]);
  return (
    <Table
      BaseComponent={TableWraper}
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        let allKeys = new Set<string>([]);
        if (keys == "all") {
          files.map((file) => {
            allKeys.add(file.id);
            setSelectedKeys(allKeys);
          });
        } else {
          setSelectedKeys(keys);
        }
      }}
      topContent={
        selectedKeys.size > 0 && (
          <div className="flex left-[11px] top-[50px] absolute items-center justify-between">
            <div>
              <Tooltip content="Delete All">
                <Trash2
                  size={20}
                  className="cursor-pointer text-red-500"
                  onClick={() => removeSelectedKeys()}
                />
              </Tooltip>
            </div>
          </div>
        )
      }
      bottomContent={
        <div className="flex w-full justify-center absolute bottom-10  ">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="name">FILE</TableColumn>
        <TableColumn className=" w-[160px]" key="size">
          SIZE
        </TableColumn>
        <TableColumn className=" w-[160px]" key="createdAt">
          CREATED AT
        </TableColumn>
        <TableColumn className=" w-[160px]" key="status">
          STATUS
        </TableColumn>
        <TableColumn className="text-center" key="settings">
          SETTINGS
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent="No files to load"
        isLoading={isLoading}
        loadingContent={<Spinner />}
        items={items}
      >
        {(item) => (
          <TableRow
            key={item.id}
            className=" cursor-pointer hover:bg-zinc-50 text-xl"
          >
            <TableCell>
              <div className="flex items-center space-x-4">
                <Image
                  src={getFileImage(item.format)}
                  alt="file"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span>{item.name}</span>
              </div>
            </TableCell>
            <TableCell>{bytesToMegaBytes(item.size)}</TableCell>
            <TableCell>{FormatTheDate(item.createdAt)}</TableCell>
            <TableCell>
              <Chip
                size="sm"
                color="warning"
                variant="dot"
                style={{ borderColor: "orange", borderWidth: 1 }}
              >
                {item.topic}
              </Chip>
            </TableCell>
            <TableCell className=" rounded-xl text-center">
              <FilesSettings fileId={item.id} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const TableWraper = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" h-[86.8vh] relative bg-white rounded-t-2xl p-10  shadow-small">
      {children}
    </div>
  );
};

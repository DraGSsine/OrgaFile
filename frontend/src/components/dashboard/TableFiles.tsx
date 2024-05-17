import React, { ReactNode, use, useState } from "react";
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
  Skeleton,
} from "@nextui-org/react";
import FilesSettings from "./files/FilesSettings";
import Image from "next/image";
import {
  FormatTheDate,
  bytesToMegaBytes,
  getFileImage,
} from "@/helpers/helpers";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { RouteNameType, filesType } from "@/types/types";
import { usePathname } from "next/navigation";
import {
  setConfirmFileRemoveModal,
  setRemoveFiles,
} from "@/redux/slices/filesSlices";

export default function TableFiles({
  files,
  isLoading,
  maxRows,
  routeName,
}: {
  files: filesType[];
  isLoading: boolean;
  maxRows: number;
  routeName: RouteNameType;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
  const [page, setPage] = React.useState(1);
  const rowsPerPage = maxRows;

  const pages = Math.ceil(files?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return files?.slice(start, end);
  }, [page, files,rowsPerPage]);

  const removeSelectedKeys = () => {
    dispatch(
      setRemoveFiles({
        files: Array.from(selectedKeys),
        isMany: true,
        isPermanently: routeName == "removedFiles",
      })
    );
    dispatch(setConfirmFileRemoveModal(true));
    setSelectedKeys(new Set([]));
  };

  return (
    <Table
      className="border-collapse "
      aria-label="Example static collection table"
      BaseComponent={TableWraper}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        let allKeys = new Set<string>([]);
        if (keys == "all") {
          files?.map((file: any) => {
            allKeys.add(file.fileId);
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
        <div className="flex w-full justify-center absolute bottom-5  ">
          <Pagination
            initialPage={1}
            showControls
            showShadow
            boundaries={2}
            total={pages || 1}
            page={page || 1}
            onChange={(Page) => setPage(Page)}
            color="primary"
            variant="flat"
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn className=" w-[40%] " key="name">
          FILE
        </TableColumn>
        <TableColumn className=" text-center w-[15%]" key="size">
          SIZE
        </TableColumn>
        <TableColumn className=" text-center w-[15%]" key="createdAt">
          CREATED AT
        </TableColumn>
        <TableColumn className=" text-center w-[15%]" key="status">
          STATUS
        </TableColumn>
        <TableColumn className=" w-[15%] text-center" key="settings">
          SETTINGS
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={!isLoading && "No files found"}
        isLoading={isLoading}
        loadingContent={<FilesLoadingSkeleton />}
        items={items}
      >
        {(item: filesType) => (
          <TableRow
            key={item.fileId}
            className=" cursor-pointer text-xl bg-transparent "
          >
            <TableCell>
              <div className="flex items-center space-x-4">
                <Image
                  src={getFileImage(item.format)}
                  alt="file"
                  width={40}
                  height={40}
                  className="rounded-md -ml-2 "
                />
                <span>{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              {bytesToMegaBytes(item.size)}
            </TableCell>
            <TableCell className="text-center">
              {FormatTheDate(item.createdAt)}
            </TableCell>
            <TableCell className="text-center">
              <Chip
                size="sm"
                color="warning"
                variant="dot"
                style={{ borderColor: "orange", borderWidth: 1 }}
              >
                {item.topic}
              </Chip>
            </TableCell>
            <TableCell className="text-center">
              <FilesSettings fileId={item.fileId} routeName={routeName} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const TableWraper = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  return (
    <div
      className={` ${
        path == "/dashboard" ? " h-[63.2vh] " : "h-[84.3vh]"
      } bg-white relative rounded-t-2xl p-10  shadow-small`}
    >
      {children}
    </div>
  );
};

const FilesLoadingSkeleton = () => {
  return (
    <div className="w-full h-full space-y-4 px-10">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="rounded-lg h-14 w-full top-24 opacity-35 ">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      ))}
    </div>
  );
};

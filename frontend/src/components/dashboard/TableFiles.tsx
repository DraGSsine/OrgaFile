import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Pagination,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import {
  FormatTheDate,
  bytesToMegaBytes,
  getFileImage,
} from "@/helpers/helpers";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  setConfirmFileRemoveModal,
  setRemoveFiles,
} from "@/redux/slices/filesSlices";
import { RouteNameType, filesType } from "@/types/types";
import FilesSettings from "./files/FilesSettings";
import { CloudUploadIcon, Delete02Icon, FileNotFoundIcon, FileSearchIcon, Files01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import { NoFilesToDisplay } from "./EmptyState/NoFilesToDisplay";

export default function ResponsiveFilesList({
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
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const rowsPerPage = maxRows;

  // Pagination calculations
  const pages = Math.ceil(files?.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return files?.slice(start, end) || [];
  }, [page, files, rowsPerPage]);

  // Remove selected files
  const removeSelectedKeys = () => {
    dispatch(
      setRemoveFiles({
        files: Array.from(selectedKeys),
        isMany: true,
        isPermanently: routeName == "removedFiles",
      })
    );
    dispatch(setConfirmFileRemoveModal(true));
    setSelectedKeys(new Set());
  };

  // Toggle selection of a single file
  const toggleFileSelection = (fileId: string) => {
    const newSelectedKeys = new Set(selectedKeys);
    if (newSelectedKeys.has(fileId)) {
      newSelectedKeys.delete(fileId);
    } else {
      newSelectedKeys.add(fileId);
    }
    setSelectedKeys(newSelectedKeys);
  };

  // Toggle all files selection
  const toggleAllSelection = () => {
    if (selectedKeys.size === items.length) {
      // If all are selected, deselect all
      setSelectedKeys(new Set());
    } else {
      // Select all files on the current page
      const allFileIds = new Set(items.map((file) => file.fileId));
      setSelectedKeys(allFileIds);
    }
  };

  // Check if all items are selected
  const isAllSelected = items.length > 0 && selectedKeys.size === items.length;

  return (
    <div className="relative h-full">
      {/* Bulk Delete Action */}

      <div
        className={` ${
          selectedKeys.size <= 0 ? " opacity-0" : "opacity-100"
        } absolute right-0 -top-10 `}
      >
        <Tooltip content={`Delete ${selectedKeys.size} Selected Files`}>
          <Button
            color="danger"
            variant="light"
            size="sm"
            startContent={<Delete02Icon size={16} />}
            onClick={removeSelectedKeys}
          >
            Delete ({selectedKeys.size})
          </Button>
        </Tooltip>
      </div>

      <div className="p-5 rounded-t-lg shadow-small relative h-full flex flex-col space-y-5">
        {/* Header Row - Mimicking Table Header */}
        <div className="grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-3 font-semibold rounded-lg pl-6 bg-[#e7e8e9] text-gray-500">
          <div className="col-span-2 pl-4 2xl:pl-4 flex items-center">
            <Checkbox
              isSelected={isAllSelected}
              onChange={toggleAllSelection}
              color="primary"
            />
            <span className="pl-5">FILE</span>
          </div>
          <div className="text-center hidden xl:inline-block ">SIZE</div>
          <div className="text-center hidden 2xl:inline-block">CREATED AT</div>
          <div className="text-center">TYPE</div>
          <div className="text-center">TOPIC</div>
          <div className="text-center">SETTINGS</div>
        </div>

        {isLoading ? (
          <SkeletonLoader maxRows={maxRows} />
        ) : (
          <div className="">
            {items.map((file) => (
              <div
                key={file.fileId}
                className={`2xl:pl-6 rounded-lg grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-4 items-center hover:bg-[#e7e8e9] transition-colors fade-in ${
                  selectedKeys.has(file.fileId) ? " bg-[#e7e8e9]" : ""
                }`}
              >
                <div className="col-span-2 flex items-center space-x-4 pl-4">
                  <Checkbox
                    isSelected={selectedKeys.has(file.fileId)}
                    onChange={() => toggleFileSelection(file.fileId)}
                    color="primary"
                  />
                  <Image
                    src={getFileImage(file.format)}
                    alt="file"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <span>{file.name}</span>
                </div>

                <div className="text-center hidden xl:inline-block">
                  {bytesToMegaBytes(file.size)}
                </div>

                <div className="text-center hidden 2xl:inline-block ">
                  {FormatTheDate(file.createdAt)}
                </div>

                <div className="text-center">
                  <Chip
                    size="sm"
                    color="warning"
                    variant="dot"
                    style={{ borderColor: "orange", borderWidth: 1 }}
                  >
                    {file.documentType}
                  </Chip>
                </div>
                <div className="text-center">
                  <Chip
                    size="sm"
                    color="warning"
                    variant="dot"
                    style={{ borderColor: "orange", borderWidth: 1 }}
                  >
                    {file.topic}
                  </Chip>
                </div>

                <div className="text-center">
                  <FilesSettings
                    fileId={file.fileId}
                    routeName={routeName}
                    fileName={`${file.name}.${file.format}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full justify-center absolute bottom-5">
          <Pagination
            total={pages || 1}
            page={page}
            onChange={setPage}
            color="primary"
            variant="flat"
            showControls
          />
        </div>

        {/* Loading and Empty States */}

        {!isLoading && files?.length == 0 && <NoFilesToDisplay />}
      </div>
    </div>
  );
}

function SkeletonLoader({ maxRows }: { maxRows: number }) {
  const rows = maxRows == 9 ? 5 : 10;
  return (
    <div className="space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className=" rounded-lg fade-in  2xl:pl-6 grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-4 items-center bg-gray-50 transition-colors"
        >
          {/* File Name & Icon */}
          <div className="col-span-2 flex items-center space-x-4 pl-4">
            <Skeleton className="w-10 h-10 bg-gray-200 rounded-md"></Skeleton>
            <Skeleton className="h-4 bg-gray-200 rounded w-3/4"></Skeleton>
          </div>

          {/* Size */}
          <div className="text-center hidden xl:inline-block">
            <Skeleton className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></Skeleton>
          </div>

          {/* Created At */}
          <div className="text-center hidden 2xl:inline-block">
            <Skeleton className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></Skeleton>
          </div>

          {/* Type */}
          <div className="text-center">
            <Skeleton className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></Skeleton>
          </div>

          {/* Topic */}
          <div className="text-center">
            <Skeleton className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></Skeleton>
          </div>

          {/* Settings */}
          <div className="text-center">
            <Skeleton className="h-6 bg-gray-200 rounded w-4 mx-auto"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}
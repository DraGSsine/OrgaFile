import React, { useState, useMemo } from "react";
import { Button, Checkbox, Chip, Pagination, Tooltip } from "@nextui-org/react";
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
import { div } from "framer-motion/client";
import {
  Delete02Icon,
  File01Icon,
  File02Icon,
  Files01Icon,
} from "hugeicons-react";

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
        {/* Header Row - Mimicking Table Header */}
        <div className="grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 border-b py-3 font-semibold t rounded-lg pl-6 bg-black text-white">
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

        {/* File List */}
        <div className="">
          {items.map((file) => (
            <div
              key={file.fileId}
              className={`2xl:pl-6 grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-4 items-center hover:bg-gray-50 transition-colors ${
                selectedKeys.has(file.fileId) ? " bg-gray-50" : ""
              }`}
            >
              {/* File Name & Icon */}
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

              {/* Size */}
              <div className="text-center hidden xl:inline-block">{bytesToMegaBytes(file.size)}</div>

              {/* Created At */}
              <div className="text-center hidden 2xl:inline-block ">{FormatTheDate(file.createdAt)}</div>

              {/* Type */}
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

              {/* Settings */}
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

        {/* Pagination */}
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

      <div className="bg-white rounded-t-lg shadow-small relative h-full">
        {/* Loading and Empty States */}
        {isLoading && (
          <div className="space-y-4 px-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 w-full bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && (!files || files.length === 0) && (
          <div className="text-center h-full text-gray-500 py-10 flex items-center justify-center flex-col gap-5">
            <Files01Icon size={100} stroke="1" />
            <h1 className=" text-2xl capitalize">No files found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

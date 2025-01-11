"use client";

import React, { useState, useMemo } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Pagination,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import {
  FormatTheDate,
  formatFileSize,
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
import {
  Delete02Icon,
  HelpCircleIcon,
} from "hugeicons-react";

import { NoFilesToDisplay } from "./EmptyState/NoFilesToDisplay";

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
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const rowsPerPage = maxRows;

  const pages = Math.ceil(files?.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return files?.slice(start, end) || [];
  }, [page, files, rowsPerPage]);

  const removeSelectedKeys = () => {
    dispatch(
      setRemoveFiles({
        files: Array.from(selectedKeys),
        isMany: true,
        isPermanently: routeName == "removedFiles",
      })
    );
    dispatch(setConfirmFileRemoveModal(true))
    setSelectedKeys(new Set());
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelectedKeys = new Set(selectedKeys);
    if (newSelectedKeys.has(fileId)) {
      newSelectedKeys.delete(fileId);
    } else {
      newSelectedKeys.add(fileId);
    }
    setSelectedKeys(newSelectedKeys);
  };

  const toggleAllSelection = () => {
    if (selectedKeys.size === items.length) {
      setSelectedKeys(new Set());
    } else {
      const allFileIds = new Set(items.map((file) => file.fileId));
      setSelectedKeys(allFileIds);
    }
  };

  const isAllSelected = items.length > 0 && selectedKeys.size === items.length;

  return (
    <div className="relative row-start-2 row-end-17">
      <div
        className={`${
          selectedKeys.size <= 0 ? "hidden" : "flex justify-center"
        } absolute right-0 -top-10`}
      >
        <Tooltip content={`Delete ${selectedKeys.size} Selected Files`}>
          <Button
            color="danger"
            variant="light"
            size="sm"
            startContent={<Delete02Icon size={16} />}
            onClick={removeSelectedKeys}
            className="font-medium"
          >
            Delete ({selectedKeys.size})
          </Button>
        </Tooltip>
      </div>

      <div className="rounded-2xl h-full shadow-sm bg-gradient-to-br from-white to-blue-50/50 border border-blue-100/50 grid grid-rows-16 grid-cols-16 p-4">
        <div className="row-start-1 row-end-16 col-start-1 col-end-17">
          <div className="h-[50px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 font-semibold rounded-xl bg-[#e7e8e9] text-gray-500 ">
            <div className="col-span-2 pl-2 xl:pl-4 flex items-center">
              <Checkbox
                isSelected={isAllSelected}
                onChange={toggleAllSelection}
                color="primary"
                className="text-white"
              />
              <span className="pl-5 font-medium">FILE</span>
            </div>
            <div className="justify-center hidden xl:flex items-center font-medium">SIZE</div>
            <div className="justify-center hidden 2xl:flex items-center font-medium">
              CREATED AT
            </div>
            <div className="justify-center hidden lg:flex items-center font-medium">TYPE</div>
            <div className="justify-center hidden sm:flex items-center font-medium">TOPIC</div>
            <div className="justify-center flex items-center font-medium">SETTINGS</div>
          </div>

          {isLoading ? (
            <SkeletonLoader rows={maxRows} />
          ) : (
            <div className="space-y-3 pt-4 h-[95%] overflow-y-scroll scrollbar-webkit scrollbar-thin">
              {items.length === 0 ? (
                <NoFilesToDisplay />
              ) : (
                items.map((file) => (
                  <div
                    key={file.fileId}
                    className={`2xl:pl-4 pl-2 rounded-xl grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-3 items-center hover:bg-blue-50/50 transition-all duration-200 ${
                      selectedKeys.has(file.fileId)
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="col-span-2 flex items-center space-x-4">
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
                        className="rounded-xl shadow-sm"
                      />
                      <span className="font-medium text-gray-800">{file.name}</span>
                    </div>

                    <div className="text-center hidden xl:flex justify-center text-gray-500">
                      {formatFileSize(file.size)}
                    </div>

                    <div className="text-center hidden 2xl:flex justify-center text-gray-500">
                      {FormatTheDate(file.createdAt)}
                    </div>

                    <div className="text-center hidden lg:flex justify-center">
                      <Chip
                        className="hidden md:flex truncate"
                        size="sm"
                        variant="flat"
                        classNames={{
                          base: "bg-white border border-blue-100/50",
                          content: "font-medium text-gray-800"
                        }}
                      >
                        {file.documentType}
                      </Chip>
                    </div>

                    <div className="text-center hidden sm:flex justify-center">
                      <Chip
                        className="hidden md:flex truncate"
                        size="sm"
                        variant="flat"
                        classNames={{
                          base: "bg-white border border-blue-100/50",
                          content: "font-medium text-gray-800"
                        }}
                      >
                        {file.topic}
                      </Chip>
                      <Tooltip content={file.topic}>
                        <Button
                          className="md:hidden"
                          color="primary"
                          variant="light"
                          size="sm"
                        >
                          <HelpCircleIcon size={24} />
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="text-center">
                      <FilesSettings
                        fileId={file.fileId}
                        routeName={routeName}
                        fileName={`${file.name}.${file.format}`}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="col-start-1 col-end-17 flex justify-center items-center">
          <Pagination
            total={pages || 1}
            page={page}
            onChange={setPage}
            color="primary"
            variant="flat"
            showControls
            classNames={{
              base: "py-0 m-0",
              cursor: "bg-primary-color text-white font-medium hover:opacity-90"
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader({ rows }: { rows: number }) {
  return (
    <div className="space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl fade-in 2xl:pl-6 grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 py-4 items-center bg-gradient-to-br transition-colors"
        >
          <div className="col-span-2 flex items-center space-x-4 pl-4">
            <Skeleton className="w-10 h-10 rounded-xl"></Skeleton>
            <Skeleton className="h-4 rounded-xl w-3/4"></Skeleton>
          </div>

          <div className="text-center hidden xl:flex justify-center">
            <Skeleton className="h-4 rounded-xl w-2/3 mx-auto"></Skeleton>
          </div>

          <div className="text-center hidden 2xl:flex justify-center">
            <Skeleton className="h-4 rounded-xl w-2/3 mx-auto"></Skeleton>
          </div>

          <div className="text-center">
            <Skeleton className="h-6 rounded-xl w-2/3 mx-auto"></Skeleton>
          </div>

          <div className="text-center">
            <Skeleton className="h-6 rounded-xl w-2/3 mx-auto"></Skeleton>
          </div>

          <div className="text-center">
            <Skeleton className="h-6 rounded-xl w-4 mx-auto"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}
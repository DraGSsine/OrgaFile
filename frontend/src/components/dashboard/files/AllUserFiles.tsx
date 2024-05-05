"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  useSelect,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Image from "next/image";
import {
  FormatTheDate,
  bytesToMegaBytes,
  getFileImage,
} from "@/helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import FilesSettings from "./FilesSettings";
import { AppDispatch, RootState } from "@/redux/store";
import { loadFiles } from "@/redux/slices/fileSlices";

const AllUserFiles = () => {
  const { isLoading, error, files } = useSelector(
    (state: RootState) => state.file
  );
  const dispatch = useDispatch<AppDispatch>();
  const HandleFileRedirection = (url: any) => {
    window.open(url, "_blank");
  };
  let list = useAsyncList({
    async load({ signal }): Promise<any> {
      try {
        dispatch(loadFiles());
        return {
          items: files,
        };
      } catch (error) {
        console.error("Error loading data:", error);
        return {
          items: [],
        };
      }
    },
    async sort({ items, sortDescriptor }: { items: any; sortDescriptor: any }) {
      return {
        items: items.sort((a: any, b: any) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });
  return (
    <div>
      <button onClick={() => dispatch(loadFiles())}>fetch data</button>

      <Table
        style={{
          borderSpacing: "0px 10px",
          borderCollapse: "separate",
        }}
        aria-label="Recent Uploads"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Name
          </TableColumn>
          <TableColumn key="size" allowsSorting>
            Size
          </TableColumn>
          <TableColumn key="createdAt" allowsSorting>
            Created At
          </TableColumn>
          <TableColumn key="topic" allowsSorting>
            Topic
          </TableColumn>
          <TableColumn
            className=" flex justify-center items-center "
            key="settings"
          >
            Settings
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={isLoading ? "" : "No files found"}
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner />}
        >
          {(item: any) => (
            <TableRow
              onDoubleClick={() => HandleFileRedirection(item.url)}
              key={item.id}
              className=" cursor-pointer hover:bg-zinc-50 text-xl"
            >
              <TableCell>
                <div className="flex items-center space-x-8">
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
                  style={{ border: "1px yellow" }}
                  size="sm"
                  color="warning"
                  variant="dot"
                >
                  {item.topic || "Unknow"}
                </Chip>
              </TableCell>
              <TableCell className=" rounded-xl text-center">
                <FilesSettings fileId={item.id} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUserFiles;

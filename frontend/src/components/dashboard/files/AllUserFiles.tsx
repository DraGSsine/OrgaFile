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
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Cookies from "js-cookie";
import Image from "next/image";
import {
  FormatTheDate,
  bytesToMegaBytes,
  getFileImage,
} from "@/helpers/helpers";
import FilesSettings from "./FilesSettings";

const AllUserFiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = JSON.parse(Cookies.get("userInfo") || "{}");

  const HandleFileRedirection = (url: any) => {
    window.open(url, "_blank");
  };
  let list = useAsyncList({
    async load({ signal }): Promise<any> {
      try {
        const response = await fetch(`http://127.0.0.1:9010/api/files/load`, {
          method: "GET",
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setIsLoading(false);
        return {
          items: data,
        };
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
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
    <Table
      isHeaderSticky
      style={{
        borderSpacing: "0px 10px",
        borderCollapse: "separate",
      }}
      aria-label="Recent Uploads"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader >
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
  );
};

export default AllUserFiles;

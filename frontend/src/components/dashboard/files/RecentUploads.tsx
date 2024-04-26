"use client";
import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import { filesType } from "@/types/types";
import Cookies from "js-cookie";
const RecentUploads = () => {
  const [fileContent, setFilesContent] = useState({
    name: "name",
    className:
      "transform rotate-180 transition-transform duration-300 ease-in-out",
    rotation: "up",
  });
  const [files, setFiles] = useState<filesType[]>([]);
  const filterFiles = (name: string) => {
    console.log(fileContent.rotation);
    if (fileContent.rotation == "up") {
      setFilesContent({
        name: name,
        className:
          "transform rotate-180 transition-transform duration-300 ease-in-out",
        rotation: "down",
      });
    } else {
      setFilesContent({
        name: name,
        className: "transform transition-transform duration-300 ease-in-out",
        rotation: "up",
      });
    }
  };

  useEffect(() => {
    const { token } = JSON.parse(Cookies.get("userInfo") as string);
    const res = fetch(`http://127.0.0.1:9010/api/files/load`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res.then((response) => {
      response.json().then((data) => {
        setFiles(data);
      });
    });
  }, []);
  //   return (
  //     <div className=" space-y-6">
  //       <div>
  //         <h1 className="text-lg text-zinc-600 font-semibold">Recent Uploads</h1>
  //       </div>
  //       <div className="flex">
  //         <span
  //           onClick={() => filterFiles("name")}
  //           className=" cursor-pointer font-semibold text-zinc-600  w-[51%] "
  //         >
  //           Name{" "}
  //         </span>
  //         <span
  //           onClick={() => filterFiles("size")}
  //           className=" cursor-pointer flex font-semibold text-zinc-600  w-[20%] "
  //         >
  //           Size{" "}
  //           <ArrowUp
  //             className={fileContent.name == "size" ? fileContent.className : ""}
  //           />
  //         </span>
  //         <span
  //           onClick={() => filterFiles("uploadDate")}
  //           className=" cursor-pointer flex font-semibold text-zinc-600 "
  //         >
  //           Upload Date{" "}
  //           <ArrowUp
  //             className={
  //               fileContent.name == "uploadDate" ? fileContent.className : ""
  //             }
  //           />
  //         </span>
  //         <span
  //           onClick={() => filterFiles("status")}
  //           className=" cursor-pointer flex font-semibold text-zinc-600 ml-auto mr-5 "
  //         >
  //           Status{" "}
  //           <ArrowUp
  //             className={
  //               fileContent.name == "status" ? fileContent.className : ""
  //             }
  //           />
  //         </span>
  //       </div>
  //       <div className=" space-y-5 ">
  //         {files?.map((file) => {
  //           return (
  //             <File
  //               format={file.format}
  //               name={file.name}
  //               size={file.size}
  //               createdAt={file.createdAt}
  //               url={file.url}
  //               _id={file._id}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({signal}) {
      let res = await fetch('https://swapi.py4e.com/api/people/?search', {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      return {
        items: json.results,
      };
    },
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

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
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="height" allowsSorting>
          Height
        </TableColumn>
        <TableColumn key="mass" allowsSorting>
          Mass
        </TableColumn>
        <TableColumn key="birth_year" allowsSorting>
          Birth year
        </TableColumn>
      </TableHeader>
      <TableBody 
        items={list.items} 
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
export default RecentUploads;

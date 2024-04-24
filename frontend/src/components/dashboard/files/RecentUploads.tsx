"use client";
import React, { useEffect, useState } from "react";
import File from "./File";
import { ArrowUp } from "../../../../public/icons";
import { filesType } from "@/types/types";
const RecentUploads = () => {
  const [fileContent, setFilesContent] = useState({name: "name",className:"transform rotate-180 transition-transform duration-300 ease-in-out",rotation: "up",});
  const [files, setFiles] = useState<filesType[]>([]);
  const filterFiles = (name: string) => {
    console.log(fileContent.rotation);
    if (fileContent.rotation == "up") {
      setFilesContent({name: name, className: "transform rotate-180 transition-transform duration-300 ease-in-out", rotation: "down",});
    } else {
      setFilesContent({name: name, className: "transform transition-transform duration-300 ease-in-out", rotation: "up",});
    }
  };

  useEffect(() => {
    const res = fetch("http://127.0.0.1:9010/api/files/load", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.then((response) => {
      response.json().then((data) => {
        setFiles(data);
      });
    });
  }, [])
  console.log(files)  
  return (
    <div className=" space-y-6">
      <div>
        <h1 className="text-lg text-zinc-600 font-semibold">Recent Uploads</h1>
      </div>
      <div className="flex">
        <span
          onClick={() => filterFiles("name")}
          className=" cursor-pointer font-semibold text-zinc-600  w-[51%] "
        >
          Name{" "}
        </span>
        <span
          onClick={() => filterFiles("size")}
          className=" cursor-pointer flex font-semibold text-zinc-600  w-[20%] "
        >
          Size{" "}
          <ArrowUp
            className={fileContent.name == "size" ? fileContent.className : ""}
          />
        </span>
        <span
          onClick={() => filterFiles("uploadDate")}
          className=" cursor-pointer flex font-semibold text-zinc-600 "
        >
          Upload Date{" "}
          <ArrowUp
            className={
              fileContent.name == "uploadDate" ? fileContent.className : ""
            }
          />
        </span>
        <span
          onClick={() => filterFiles("status")}
          className=" cursor-pointer flex font-semibold text-zinc-600 ml-auto mr-5 "
        >
          Status{" "}
          <ArrowUp
            className={
              fileContent.name == "status" ? fileContent.className : ""
            }
          />
        </span>
      </div>

      <div className=" space-y-5 ">
            {
              files.map((file) => {
                return (
                  <File
                  
                    format={file.format}
                    name={file.name}
                    size={file.size}
                    lastModified={file.lastModified}
                    url={file.url}
                  />
                );
              })
            }
      </div>
    </div>
  );
};

export default RecentUploads;

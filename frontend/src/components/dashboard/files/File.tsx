import React from "react";
import Image from "next/image";
import { filesType } from "@/types/types";
import { FormatTheDate, bytesToMegaBytes } from "@/helpers/helpers";
import FilesSettings from "./FilesSettings";
const File = ({ name, size, createdAt , url, format , id }: filesType) => {
  const formatNmae = format.toLowerCase();
  const allowedFormats = ["jpg", "jpeg", "png", "md", "txt", "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];
  const getIconName = (formatNmae: string) => {
    if (formatNmae === "jpg" || formatNmae === "jpeg" || formatNmae === "png") {
      return "image";
    }
    else if (formatNmae === "md" || formatNmae === "txt") {
      return "txt";
    }
    else if (allowedFormats.includes(formatNmae)) {
      return formatNmae;
    }
    else
      return "file";
  };
  const color = `bg-${getIconName(formatNmae)}-color`;

  return (
    <div className=" hover:scale-[100.5%] transition-all ease-in cursor-pointer shadow-sm w-full flex items-center bg-white p-4 rounded-lg">
        <div className=" w-[51%] flex items-center space-x-4 ">
          <Image
            src={`/formatImages/${getIconName(formatNmae)}.png`}
            alt="file icon"
            width={40}
            height={40}
          />
          <p className="text-sm text-center capitalize font-medium ">
            {name}
          </p>
        </div>
        <span className=" block w-[21%]">{bytesToMegaBytes(size)} Mb</span>
        <span>{FormatTheDate(createdAt)} Day ago </span>
        <span
          className={`rounded-lg px-2 py-1 text-xs ml-auto mr-5 ${color}`}
        >
          New
        </span>
        <FilesSettings fileId={id}/>
    </div>
  );
};

export default File;

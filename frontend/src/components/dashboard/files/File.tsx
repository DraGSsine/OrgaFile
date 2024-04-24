import React from "react";
import Image from "next/image";
import { filesType } from "@/types/types";
import { DateToDays, bytesToMegaBytes } from "@/helpers/helpers";
const File = ({ public_id, bytes, created_at, url, format }: filesType) => {
  const formatNmae = format.toLowerCase();
  const getIconName = (formatNmae: string) => {
    if (formatNmae === "jpg" || formatNmae === "jpeg" || formatNmae === "png") {
      return "image";
    } else {
      return formatNmae;
    }
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
            {public_id}
          </p>
        </div>
        <span className=" block w-[21%]">{bytesToMegaBytes(bytes)} Mb</span>
        <span>{DateToDays(created_at)} Day ago </span>
        <span
          className={`rounded-lg px-2 py-1 text-xs ml-auto mr-5 ${color}`}
        >
          New
        </span>
    </div>
  );
};

export default File;

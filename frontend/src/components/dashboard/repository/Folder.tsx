import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import FolderDownlaodButton from "./FolderDownlaodButton";
import { bytesToMegaBytes } from "@/helpers/helpers";
import { useMemo } from "react";
import { Folder01Icon } from "hugeicons-react";
import { Tooltip } from "@nextui-org/react";
const FolderComponent = ({ folder }: { folder: FolderType }) => {
  const { filesSize } = useMemo(() => {
    return {
      filesSize: folder?.files?.reduce((acc, file) => acc + file.size, 0),
    };
  }, [folder]);

  return (
    <div className=" h-[230px] justify-between flex  flex-col bg-blue-100 p-6 rounded-lg fade-in ">
      <div className="flex justify-between items-center mb-5">
        <Folder01Icon size={60} className="fill-blue-500 text-blue-500" />
        <Tooltip content={`Downalod`}>
          <FolderDownlaodButton folder={folder} />
        </Tooltip>
      </div>

      <div>
        <p className=" font-medium text-[1.1rem] mb-1 ">{folder?.name}</p>
        <p className=" text-zinc-500 text-sm">{folder?.files?.length} files</p>
      </div>
      <div
        className="
        shadow-[0px_0px_1px_0px_#4299e1]  
          capitalize flex justify-between items-center bg-white rounded-full mt-4"
      >
        <span className=" text-primary-500 pl-4 font-medium text-sm ">
          {bytesToMegaBytes(filesSize)}
        </span>
        <Link href={`repository/${folder?.folderId}`}>
          <div className=" px-2 py-1 bg-blue-500 font-medium text-white max-h-8 rounded-full">
            Open
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FolderComponent;

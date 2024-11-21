import { FolderType } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Folder } from "lucide-react";
import Link from "next/link";
import FolderDownlaodButton from "./FolderDownlaodButton";
import { bytesToMegaBytes } from "@/helpers/helpers";
const FolderComponent = ({ folder }: { folder: FolderType }) => {
  const filesSize = folder.files.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className=" w-64 justify-between flex  flex-col bg-blue-50 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-5">
        <Folder size={60} className="fill-blue-500 stroke-blue-500" />
        <FolderDownlaodButton folder={folder} />
      </div>

      <div>
        <p className=" font-medium text-[1.1rem] mb-1 ">{folder.name}</p>
        <p className=" text-zinc-500 text-sm">{folder.files.length} files</p>
      </div>
      <div
        className="
        shadow-[0px_0px_1px_0px_#4299e1]  
          capitalize flex justify-between items-center bg-white rounded-full mt-4"
      >
        <span className=" text-primary-500 pl-4 font-medium text-sm ">
          {bytesToMegaBytes(filesSize)}
        </span>
        <Link href={`/dashboard/repository/${folder.folderId}`}>
          <Button className=" bg-blue-500 font-medium text-white max-h-8 rounded-full">
            Open
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FolderComponent;

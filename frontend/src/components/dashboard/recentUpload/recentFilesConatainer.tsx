"use client";

import { RecentUploadsProps } from "@/types/types";
import TableFiles from "../TableFiles";
import { HeaderPage } from "../HeaderPage";
import { FolderUploadIcon } from "hugeicons-react";


export function RecentUploadsContainer({
  files,
  isLoading,
  maxRows = 9,
  routeName = "allFiles"
}: RecentUploadsProps) {
  return (
    <div className=" h-full grid grid-rows-12 ">
      <HeaderPage icon={<FolderUploadIcon className="w-8 h-8 text-primary-500" />} title="Recent Uploads" description={`view last ${maxRows} files`} />
        <TableFiles
          maxRows={maxRows}
          files={files}
          isLoading={isLoading}
          routeName={routeName}
        />
    </div>
  );
}

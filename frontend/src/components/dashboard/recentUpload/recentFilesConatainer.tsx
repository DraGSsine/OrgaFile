"use client";

import { RecentUploadsProps } from "@/types/types";
import TableFiles from "../TableFiles";
import { HeaderPage } from "../HeaderPage";
import { File02Icon, FolderUploadIcon } from "hugeicons-react";


export function RecentUploadsContainer({
  files,
  isLoading,
  maxRows = 9,
  routeName = "allFiles"
}: RecentUploadsProps) {
  return (
    <div className=" h-full grid grid-rows-12 ">
      <HeaderPage icon={<File02Icon className="w-8 h-8 text-primary-color" />} title="Recent Uploads" description={`view last ${maxRows} files`} />
        <TableFiles
          maxRows={maxRows}
          files={files}
          isLoading={isLoading}
          routeName={routeName}
        />
    </div>
  );
}

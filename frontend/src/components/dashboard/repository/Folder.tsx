"use client";

import { bytesToMegaBytes } from "@/lib/helpers";
import { FolderType } from "@/types/types";
import Link from "next/link";
import { motion } from "framer-motion";
import FolderDownlaodButton from "../repository/FolderSettings";
import { Folder01Icon } from "hugeicons-react";

export function FolderComponent({ index, folder }: {index:number, folder: FolderType }) {
  const filesSize = folder.files.reduce((acc, file) => acc + file.size, 0);

  return (
    <motion.div
      key={index}
      className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 shadow-sm border border-blue-100/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className=" bg-primary-color p-3 rounded-xl">
          <Folder01Icon className="w-6 h-6 text-white" />
        </div>
        <FolderDownlaodButton folder={folder} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg truncate text-gray-800">
          {folder.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {folder.files.length} {folder.files.length === 1 ? "file" : "files"}
          </span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">
            {bytesToMegaBytes(filesSize)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/dashboard/repository/${folder.folderId}`}
          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary-color text-white font-medium hover:opacity-90 transition-opacity"
        >
          Open Folder
        </Link>
      </div>
    </motion.div>
  );
}

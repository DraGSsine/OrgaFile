import { bytesToMegaBytes } from '@/helpers/helpers';
import { FolderType } from '@/types/types';
import { Folder01Icon } from 'hugeicons-react';
import React from 'react';
import FolderDownlaodButton from '../repository/FolderDownlaodButton';
import Link from 'next/link';

export function FolderCard({ folder }: { folder: FolderType }) {
  const filesSize = folder.files.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className=" justify-between flex flex-col bg-blue-100 p-6 rounded-lg fade-in">
      <div className="flex justify-between items-center mb-5">
        <Folder01Icon className=" w-12 h-12 fill-primary-color text-primary-color" />
        <FolderDownlaodButton folder={folder} />
      </div>

      <div>
      <p className="font-medium text-base md:text-lg lg:text-xl truncate mb-1">{folder.name}</p>
        <p className="text-zinc-500 text-sm">
          {folder.files.length} {folder.files.length === 1 ? 'file' : 'files'}
        </p>
      </div>

      <div className=" capitalize flex justify-between items-center bg-white rounded-full mt-4">
        <span className="text-primary-color pl-1 xl:pl-4 font-medium text-sm">
          {bytesToMegaBytes(filesSize)}
        </span>
        <Link
          href={`dashboard/repository/${folder.folderId}`}
          className=" px-1 lg:px-2 py-1 bg-primary-color font-medium text-white max-h-8 rounded-full"
        >
          Open
        </Link>
      </div>
    </div>
  );
}
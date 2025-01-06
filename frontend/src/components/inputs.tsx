"use client";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ToggleFile, loadAllFiles } from "@/redux/slices/filesSlices";
import { SearchIcon } from "../../public/icons";
import Image from "next/image";
import { bytesToMegaBytes, getFileImage } from "@/helpers/helpers";

import cookies from "js-cookie";
import { getPresignedUrl } from "@/helpers/action";

export const SearchInput = () => {

  const { files } = useSelector(
    (state: RootState) => state.files.loadFilesState
  );
  const dispatch = useDispatch<AppDispatch>();


  return (
    <Autocomplete
      onFocus={() => dispatch(loadAllFiles())}
      variant="bordered"
      placeholder="Search for files"
      className=" hidden md:flex w-[400px] 2xl:w-[600px] placeholder:text-gray-600"
      onSelectionChange={async (key: any) => {
        if (!key) return;
        const userId = cookies.get("userId");
        const fileId = files[key].fileId;
        const url = await getPresignedUrl(`${userId}/${fileId}`);
        dispatch(ToggleFile({ isOpen: true, url}));
      }}
      startContent={
        <SearchIcon className="text-gray-600" width="25" height="25" />
      }
    >
      {files.map((file, index) => (
        <AutocompleteItem textValue={file.name} key={index}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center px-2">
              <Image
                src={getFileImage(file.format)}
                alt="file"
                width={30}
                height={30}
                className="rounded-md "
              />
              <span>{file.name}</span>
            </div>
            <span>{bytesToMegaBytes(file.size)}</span>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

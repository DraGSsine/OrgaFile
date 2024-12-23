"use client";
import React, { useEffect, useState } from "react";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  SearchIcon,
} from "../../public/icons";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import { ZodIssue } from "zod";
import Image from "next/image";
import { bytesToMegaBytes, getFileImage } from "@/helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ToggleFile, loadAllFiles } from "@/redux/slices/filesSlices";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";

export const PasswordInput = ({
  errorState,
  label,
  name,
  onChange,
}: {
  errorState: ZodIssue | null;
  label: string;
  name: string;
  onChange: (value: string) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(errorState);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setError(errorState);
  }, [errorState]);
  return (
    <Input
      isInvalid={error?.path[0] === name ? true : false}
      errorMessage={error?.path[0] === name && error.message}
      label={label}
      variant="bordered"
      endContent={
        <button
          className="focus:outline-none flex items-center justify-center"
          type="button"
          onClick={toggleVisibility}
        >
          {!isVisible ? (
            <ViewOffIcon
              width="25"
              height="35"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            < ViewIcon
              width="25"
              height="35"
              className="text-2xl text-default-400 pointer-events-none"
            />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-full flex"
      onChange={(e) => {
        onChange(e.target.value);
        setError(null);
      }}
    />
  );
};

export const EmailInput = ({
  errorState,
  onChange,
}: {
  errorState: ZodIssue | null;
  onChange: (value: string) => void;
}) => {
  const [error, setError] = useState(errorState);

  useEffect(() => {
    setError(errorState);
  }, [errorState]);

  return (
    <Input
      isInvalid={error?.path[0] == "email" ? true : false}
      errorMessage={
        error?.path[0] == "email" && "Please enter a valid email adress"
      }
      onChange={(e) => {
        onChange(e.target.value), setError(null);
      }}
      label="Email"
      variant="bordered"
      description="We'll never share your email with anyone else."
      className="max-w-full flex"
    />
  );
};

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
      onSelectionChange={(key: any) => {
        if (!key) return;
        const url = files[key].url;
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

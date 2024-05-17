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
  AutocompleteSection,
  Input,
} from "@nextui-org/react";
import { ZodIssue } from "zod";
import Image from "next/image";
import { getFileImage } from "@/helpers/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ToggleFile } from "@/redux/slices/filesSlices";

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
          {isVisible ? (
            <EyeSlashFilledIcon
              width="25"
              height="35"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            <EyeFilledIcon
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
  const dispatch = useDispatch<AppDispatch>();
  type FileSearch = {
    name: string;
    format: string;
    size: string;
  };
  const files: FileSearch[] = [
    {
      name: "How to learn React",
      format: "pdf",
      size: "1.2MB",
    },
    {
      name: "the truth about the universe",
      format: "doc",
      size: "2.2MB",
    },
    {
      name: "The best way to learn javascript",
      format: "pdf",
      size: "3.2MB",
    },
  ];

  return (
    <Autocomplete
      variant="bordered"
      placeholder="Search for files"
      className=" w-[400px] 2xl:w-[600px]"
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      {files.map((file) => (
        <AutocompleteItem onClick={()=>dispatch(ToggleFile(true))} textValue={file.name} key={file.name}>
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
            <span>{file.size}</span>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

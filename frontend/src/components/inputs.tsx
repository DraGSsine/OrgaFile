"use client";
import React, { useEffect, useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon, SearchIcon } from "../../public/icons";
import { Input } from "@nextui-org/react";
import { ZodIssue } from "zod";

export const PasswordInput = ({ errorState, label, name, onChange }: { errorState: ZodIssue | null, label: string, name: string, onChange: (value: string) => void }) => {
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


export const EmailInput = ({errorState,onChange} : {errorState:ZodIssue | null,onChange:(value:string)=> void}) => {
  const [error, setError] = useState(errorState);

  useEffect(() => {
    setError(errorState);
  }, [errorState]);

  return (
    <Input
      isInvalid={error?.path[0]=="email"?true:false}
      errorMessage={error?.path[0]=="email"&&"Please enter a valid email adress"}
      onChange={(e) => {onChange(e.target.value),setError(null)}}
      label="Email"
      variant="bordered"
      description="We'll never share your email with anyone else."
      className="max-w-full flex"
    />
  );
};



export const SearchInput = () => {
  return (
    <Input
      placeholder="Type To Search"
      variant="bordered"
      radius="sm"
      className="custom-input"
      style={{ width: '450px', height: '400px'}}

    />
  );
};



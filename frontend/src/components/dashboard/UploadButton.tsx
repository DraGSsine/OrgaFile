"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { raduisType, variantType } from "@/types/types";
import { UploadDocumentIcon } from "../../../public/icons";
import ModalComponent from "../signup/Modal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const UploadButton = ({
  radius,
  className,
  variant,
}: {
  radius: raduisType;
  className: string;
  variant: variantType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFilesLoaded } = useSelector((state: RootState) => state.files);
  
  useEffect(() => {
    if (isFilesLoaded) {
      onClose();
      console.log(isFilesLoaded)
      console.log(isOpen)
    }
  }, [isFilesLoaded, onClose]);

  return (
    <>
      <Button
        onPress={onOpen}
        className={className}
        radius={radius}
      >
        <span className=" font-medium text-white text-base ">Upload</span>
        <UploadDocumentIcon
          width={70}
          height={70}
          className="flex-shrink-0"
          stroke={"#ffffff"}
        />
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default UploadButton;

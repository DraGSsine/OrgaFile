"use client";
import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { raduisType, variantType } from "@/types/types";
import { UploadDocumentIcon } from "../../../public/icons";
import ModalComponent from "../signUp/Modal";

const UploadButton = ({
  radius,
  className,
  variant,
}: {
  radius: raduisType;
  className: string;
  variant: variantType;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        variant={variant}
        className={className}
        radius={radius}
      >
        <span className=" font-semibold text-base text-white">Upload</span>
        <UploadDocumentIcon
          width={70}
          height={70}
          className="flex-shrink-0"
          stroke={"#ffffff"}
        />
      </Button>
      <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default UploadButton;

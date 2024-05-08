"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { raduisType, variantType } from "@/types/types";
import { UploadDocumentIcon } from "../../../public/icons";
import ModalComponent from "../signup/Modal";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModal } from "@/redux/slices/filesSlices";

const UploadButton = ({
  radius,
  className,
}: {
  radius: raduisType;
  className: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Button
        onPress={() => dispatch(setUploadModal(true))}
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
      <ModalComponent/>
    </>
  );
};

export default UploadButton;

"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { raduisType, variantType } from "@/types/types";
import { UploadDocumentIcon } from "../../../public/icons";
import ModalComponent from "../signup/Modal";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModal } from "@/redux/slices/filesSlices";
import { CloudUploadIcon } from "hugeicons-react";


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
        <span className=" font-medium text-white texet-[1.1rem] ">Upload here</span>
        <CloudUploadIcon size={24} className="flex-shrink-0 text-white " />
      </Button>
      <ModalComponent />
    </>
  );
};

export default UploadButton;

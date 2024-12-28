"use client";
import React from "react";
import { Button, Modal, ModalBody, ModalContent} from "@nextui-org/react";
import { raduisType } from "@/types/types";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModal } from "@/redux/slices/filesSlices";
import { CloudUploadIcon } from "hugeicons-react";
import { UploadDropzone } from "./DropZone";

const UploadButton = ({
  radius,
  className,
}: {
  radius: raduisType;
  className: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { uploadFileState } = useSelector((state: RootState) => state.files);
  return (
    <>
      <Button
        onPress={() => dispatch(setUploadModal(true))}
        className={className}
        radius={radius}
      >
        <span className=" font-medium text-white texet-[1.1rem] ">
          Upload here
        </span>
        <CloudUploadIcon size={24} className="flex-shrink-0 text-white " />
      </Button>
      <Modal
        hideCloseButton
        backdrop="blur"
        isOpen={uploadFileState.openUploadModal}
        onClose={() => dispatch(setUploadModal(false))}
        size="xl"
        radius="lg"
        classNames={{
          backdrop: "bg-[#fff] bg-opacity-50 backdrop-opacity-50 blur-xs border-2 border-blue-500 ",
        }}
      >
        <ModalContent>
          <ModalBody className="py-5 ">
            <UploadDropzone />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadButton;

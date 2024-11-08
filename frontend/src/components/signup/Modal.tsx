import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { UploadDropzone } from "../dashboard/DropZone";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setUploadModal } from "@/redux/slices/filesSlices";

export default function ModalComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { uploadFileState } = useSelector((state: RootState) => state.files);
  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={uploadFileState.openUploadModal}
        onClose={() => dispatch(setUploadModal(false))}
        size="xl"
        radius="lg"
        classNames={{
          backdrop: "bg-[#fff] bg-opacity-50 backdrop-opacity-50 blur-xs",
        }}
      >
        <ModalContent>
          <ModalBody className="bg-zinc-100">
            <UploadDropzone/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { UploadDropzone } from "../dashboard/DropZone";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ModalComponent({ isOpen,onOpen, onOpenChange }: any) {

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#fff]/40 backdrop-opacity-40 blur-sm",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <>
            <ModalBody className="bg-zinc-100">
              <UploadDropzone isSubscribed={false} onOpen={onOpen} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

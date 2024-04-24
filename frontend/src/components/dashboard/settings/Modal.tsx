import React from "react";
import {Modal, ModalContent, ModalBody} from "@nextui-org/react";
import { UploadDropzone } from "../dashboard/DropZone";

export default function ModalComponent({isOpen, onOpenChange}:any) {

  return (
    <>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#fff]/60 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
            <>
              <ModalBody className="bg-zinc-100">
                <UploadDropzone isSubscribed={false} />
              </ModalBody>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}

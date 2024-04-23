'use client'
import React from "react";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ModalComponent from "../signup/Modal";

const UploadButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="secondary">
        Open Modal
      </Button>
      <ModalComponent 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default UploadButton;

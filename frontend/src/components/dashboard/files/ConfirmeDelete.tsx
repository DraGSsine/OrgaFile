import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "@/redux/slices/filesSlices";

export default function ConfirmDelete({}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteFileId } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    dispatch(deleteFile(deleteFileId));
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader>Delete File</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete the file ?
            </p>
            <p>
              This action cannot be undone. All data associated with this file
              will be permanently deleted.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

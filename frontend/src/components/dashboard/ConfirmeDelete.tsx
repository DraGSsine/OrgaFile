import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFile,
  removeManyFiles,
  setConfirmFileRemoveModal,
  resetFilesState,
} from "@/redux/slices/filesSlices";
import { AlertTriangleIcon } from "lucide-react";

export default function ConfirmDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { removeFileState } = useSelector((state: RootState) => state.files);
  const Message = removeFileState.isMany
    ? "delete these files"
    : "delete this file";
  const closeModal = () => {
    dispatch(resetFilesState())
    dispatch(setConfirmFileRemoveModal(false));
  };
  const handleDelete = () => {
    if (removeFileState.isMany) {
      if (removeFileState.isPremanently) {
        dispatch(
          removeManyFiles({ files: removeFileState.files, isPremanently: true })
        );
      } else {
        dispatch(
          removeManyFiles({
            files: removeFileState.files,
            isPremanently: false,
          })
        );
      }
    } else {
      if (removeFileState.isPremanently) {
        dispatch(
          removeFile({ fileId: removeFileState.files[0], isPremanently: true })
        );
      } else {
        dispatch(
          removeFile({ fileId: removeFileState.files[0], isPremanently: false })
        );
      }
    }
  };
  return (
    <>
      <Modal
        classNames={{
          body: "py-6",
          backdrop: "bg-[#fff]/40 backdrop-opacity-40 blur-xs ",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={removeFileState.confirmRemoveModal}
        onClose={() => closeModal()}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalBody>
            <div className="flex items-center justify-center gap-4">
              <div className=" bg-[#F31260]/15 flex items-center justify-center min-w-12 min-h-12 rounded-full ">
                <AlertTriangleIcon color="#F31260" />
              </div>
              <div className=" space-y-3">
                <p className=" font-semibold">
                  Are you sure you want to {Message} ?
                </p>
                <p className=" text-sm text-zinc-500">
                  This action cannot be undone. All data associated with this
                  file will be permanently deleted.
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => closeModal()}
            >
              Cancel
            </Button>
            <Button
              disabled={removeFileState.isLoading}
              spinner={<Spinner color="white" size="sm" />}
              isLoading={removeFileState.isLoading}
              color="danger"
              onPress={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

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
  resetConfirmFileRemoveModal,
} from "@/redux/slices/filesSlices";
import { Alert02Icon } from "hugeicons-react";

export default function ConfirmDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { removeFileState } = useSelector((state: RootState) => state.files);

  // Warring message

  const Message = removeFileState.isMany
    ? "Confirm deletion of these files?"
    : "Confirm deletion of this file?";
  const permanentlyMessage = removeFileState.isPermanently
    ? "Please be aware that this action is irreversible. All data associated with this file will be permanently erased."
    : "Please note that this action is reversible. All data associated with this file will be moved to the trash bin.";

  const closeModal = () => {
    dispatch(resetConfirmFileRemoveModal());
    dispatch(setConfirmFileRemoveModal(false));
  };
  const handleDelete = () => {
    if (removeFileState.isMany) {
      if (removeFileState.isPermanently) {
        dispatch(
          removeManyFiles({ files: removeFileState.files, isPermanently: true })
        );
      } else {
        dispatch(
          removeManyFiles({
            files: removeFileState.files,
            isPermanently: false,
          })
        );
      }
    } else {
      if (removeFileState.isPermanently) {
        dispatch(
          removeFile({ fileId: removeFileState.files[0], isPermanently: true })
        );
      } else {
        dispatch(
          removeFile({ fileId: removeFileState.files[0], isPermanently: false })
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
              <div className={` ${removeFileState.isPermanently ? "bg-[#F31260]/15":"bg-[#FFA500]/15"} flex items-center justify-center min-w-14 min-h-14 rounded-full `}>
                <Alert02Icon color={ removeFileState.isPermanently ? "#F31260" : "#FFA500"} />
              </div>
              <div className=" space-y-3">
                <p className=" font-semibold">{Message}</p>
                <p className=" text-sm text-zinc-500">{permanentlyMessage}</p>
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
              color={removeFileState.isPermanently ? "danger" : "warning"}
              variant="solid"
              onPress={handleDelete}
            >
              {removeFileState.isPermanently ? "Permanently Delete" : "Move to Trash"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

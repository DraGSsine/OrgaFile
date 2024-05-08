import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFile,
  deleteManyFiles,
  setConfirmFileRemove,
  setConfirmManyFileRemove,
} from "@/redux/slices/filesSlices";
import { AlertTriangleIcon } from "lucide-react";

export default function ConfirmDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { removeFile, removeManyFiles } = useSelector(
    (state: RootState) => state.files
  );
  let removeOneOrManyFiles = removeFile.confirmeRemoveModal ? "one" : "many";
  const headerMessage = removeOneOrManyFiles === "one" ? "Delete file" : "Delete files";
  const loading = removeFile.fileDeletLoading || removeManyFiles.isLoading;

  const handleDelete = () => {
    if (removeOneOrManyFiles === "one") {
      dispatch(deleteFile(removeFile.file as string));
      dispatch(setConfirmFileRemove({ active: false, fileId: "" }));
    } else if (removeOneOrManyFiles === "many") {
      dispatch(deleteManyFiles(Array.from(removeManyFiles.files)));
      dispatch(setConfirmManyFileRemove({ active: false, files: [""] }));
    }
  };
  const closeModal = () => {
    if (removeOneOrManyFiles === "one") {
      dispatch(setConfirmFileRemove({ active: false, fileId: "" }));
    } else if (removeOneOrManyFiles === "many") {
      dispatch(setConfirmManyFileRemove({ active: false, files: [""] }));
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
        isOpen={
          removeFile.confirmeRemoveModal || removeManyFiles.confirmeRemoveModal
        }
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
                  Are you sure you want to {headerMessage} ?
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
              disabled={loading}
              spinner={<Spinner color="white" size="sm" />}
              isLoading={loading}
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

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
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useDispatch, useSelector } from "react-redux";
import { ToggleFile } from "@/redux/slices/filesSlices";

const RenderDocs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.files.toggleFile);
  const docs = [
    {
      fileName: "dummy.pdf",
      uri: "https://doctify.s3.eu-north-1.amazonaws.com/6644c8b7c049b2dd66b59a43/f59748fa49f33a1e2fc514d54a070efa.pdf",
    },
  ];
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={() => {
          dispatch(ToggleFile(!isOpen));
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <iframe
                src="https://doctify.s3.eu-north-1.amazonaws.com/6644c8b7c049b2dd66b59a43/f59748fa49f33a1e2fc514d54a070efa.pdf"
                width="100%"
                height="100%"
              ></iframe>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RenderDocs;

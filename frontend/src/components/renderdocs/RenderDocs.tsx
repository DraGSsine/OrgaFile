"use client";

import { useForm } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { ToggleFile } from "@/redux/slices/filesSlices";
import { useState } from "react";
import { FileNotSupported } from "./FileNotSupported";

const RenderDocs = () => {
  const supportedFormats = ["pdf", "doc", "docx", "txt"];
  const [loading, setLoading] = useState(true);
  const { isOpen, url } = useSelector(
    (state: RootState) => state.files.toggleFile
  );
  const isSupported = supportedFormats.some((format) => url?.includes(format));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ToggleFile({ isOpen: false, url: null }));
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  if (!url) {
    return null;
  }

  return (
    <Modal
      className="h-[88vh] overflow-auto"
      size="5xl"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {isSupported ? (
              <>
                {loading && (
                  <div className="flex justify-center items-center h-full">
                    <div className="loader">Loading...</div>
                  </div>
                )}
                <iframe
                  src={url}
                  height="100%"
                  onLoad={handleIframeLoad}
                  style={{ display: loading ? "none" : "block" }}
                ></iframe>
              </>
            ) : (
              <FileNotSupported onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RenderDocs;


"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Button, 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader, 
  Spinner, 
  Input 
} from "@nextui-org/react";
import { ChevronDown, ChevronUp, FileWarning } from "lucide-react";

// Explicitly set PDF.js worker source to ensure compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderDocs = ({ isOpen, url, onClose, isSupported = true }) => {
  const { width, ref } = useResizeDetector();

  const [numPages, setNumPages] = useState<number | undefined>();
  const [currPage, setCurrPage] = useState<number>(1);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => {
        const pageNum = Number(num);
        return pageNum > 0 && (numPages === undefined || pageNum <= numPages);
      }, {
        message: "Invalid page number"
      }),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  useEffect(() => {
    setValue("page", String(currPage));
  }, [currPage, setValue]);

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page));
  };

  // Fallback for file load error
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setLoadError('Failed to load PDF. Please check the file and try again.');
  };

  if (loadError) {
    return (
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onClose}
        size="md"
      >
        <ModalContent>
          <ModalHeader>PDF Load Error</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center">
              <FileWarning className="text-red-500 mb-4" size={48} />
              <p className="text-center">{loadError}</p>
              <Button 
                color="primary" 
                onClick={onClose} 
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      className="h-[88vh] overflow-auto"
      size="5xl"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent>
        {() => (
          <>
            {isSupported && (
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Button
                    disabled={currPage <= 1}
                    onClick={() =>
                      setCurrPage((prev) => Math.max(prev - 1, 1))
                    }
                    variant="ghost"
                    aria-label="previous page"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <Input
                      size="sm"
                      {...register("page")}
                      className="w-12"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit(handlePageSubmit)();
                        }
                      }}
                    />
                    <p className="text-zinc-700 text-sm space-x-1">
                      <span>/</span>
                      <span>{numPages ?? "x"}</span>
                    </p>
                  </div>

                  <Button
                    disabled={numPages === undefined || currPage === numPages}
                    onClick={() =>
                      setCurrPage((prev) => Math.min(prev + 1, numPages!))
                    }
                    variant="ghost"
                    aria-label="next page"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </ModalHeader>
            )}

            <ModalBody>
              <div ref={ref} className="w-full h-full">
                {isSupported ? (
                  <Document
                    file={url}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    onLoadError={handleDocumentLoadError}
                    loading={
                      <div className="flex justify-center items-center h-full">
                        <Spinner />
                      </div>
                    }
                  >
                    <Page
                      pageNumber={currPage}
                      width={width}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                    />
                  </Document>
                ) : (
                  <FileNotSupported onClose={onClose} />
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const FileNotSupported = ({ onClose }) => {
  return (
    <section className="bg-white h-full dark:bg-gray-900">
      <div className="container flex items-center min-h-full px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-4 text-sm font-medium text-orange-400 rounded-full bg-orange-50 dark:bg-gray-800">
            <FileWarning size={40} />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            File not supported
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The viewer only supports <span className="font-medium text-orange-400">PDF</span> files for now. Please try another file.
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button 
              onClick={onClose} 
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              Close
            </button>

            <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RenderDocs;
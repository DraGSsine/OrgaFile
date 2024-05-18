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
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  cn,
  Input,
} from "@nextui-org/react";
import { ToggleFile } from "@/redux/slices/filesSlices";
import { useState, useEffect } from "react";
import { z } from "zod";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderDocs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.files.toggleFile);
  const { width, ref } = useResizeDetector();
  let url =
    "https://doctify.s3.eu-north-1.amazonaws.com/6644c8b7c049b2dd66b59a43/e00ed29dd77fa7b84dc36b1b8209b3cd-Assassins_creed_a_multi-cultural_read.pdf";

  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
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

  return (
    <>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => dispatch(ToggleFile(!isOpen))}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Button
                    disabled={currPage <= 1}
                    onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
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
              <ModalBody>
                <div ref={ref} className="h-[90vh] w-full">
                  <Document
                    loading={
                      <div className="flex justify-center">
                        <Spinner />
                      </div>
                    }
                    onLoadError={() => {
                      toast.error("Error loading PDF");
                    }}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    file={url}
                    className="max-h-full"
                  >
                    <Page width={width ? width : 1} pageNumber={currPage} />
                  </Document>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RenderDocs;

"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ProgressBar from "./Progress";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModal, uploadFiles } from "@/redux/slices/filesSlices";

export const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { uploadFileState } = useSelector((state: RootState) => state.files);

  const startSimulatedProgress = () => {
    setLoading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95 || uploadFileState.isFileUploaded) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 500);
    return interval;
  };

  useEffect(() => {
    if (uploadFileState.isFileUploaded) {
      setUploadProgress(100);
      setTimeout(() => {
        dispatch(setUploadModal(false));
        router.push("/dashboard/repository");
      }, 2000);
    }
    if (uploadFileState.error) {
      toast.error("Failed to upload files");
    }
  }, [uploadFileState.isFileUploaded, uploadFileState.error]);

  return (
    <Dropzone
      multiple
      onDrop={async (acceptedFiles) => {
        const formData = new FormData();
        const interval = startSimulatedProgress();
        acceptedFiles.forEach((file) => {
          formData.append("files", file);
        });
        dispatch(uploadFiles(formData));
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-96 w-[500px] m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500">
                  PDF (up to {isSubscribed ? "16" : "4"}MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {loading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <ProgressBar
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                  />
                  {uploadProgress === 100 && (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  )}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

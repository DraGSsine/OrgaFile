"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import ProgressBar from "./Progress";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUploadModal, uploadFiles } from "@/redux/slices/filesSlices";
import {
  CloudIcon,
  File01Icon,
  File02Icon,
  FileBlockIcon,
  Loading03Icon,
  PlusMinus01Icon,
} from "hugeicons-react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";
import { CategorizationMode, CategorizationOption } from "@/types/types";

export const UploadDropzone = () => {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { uploadFileState } = useSelector((state: RootState) => state.files);
  const [showModes, setShowModes] = useState(true);
  function progressHandler() {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev < 95) {
          let random = Math.random() * 10;
          if (prev + random > 95) {
            return 95;
          }
          return prev + random;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (uploadFileState.isFileUploaded) {
      setUploadProgress(100);
      toast.success("File uploaded successfully");
      setTimeout(() => {
        dispatch(setUploadModal(false));
        router.push("/dashboard/repository");
      }, 2000);
    } else if (uploadFileState.error) {
      toast.error(uploadFileState.error.message || "File upload failed");
      setLoading(false);
      setUploadProgress(0);
    }
  }, [
    loading,
    uploadFileState.isFileUploaded,
    uploadFileState.error,
    dispatch,
    router,
  ]);
  return (
    <>
      {showModes ? (
        <CategorizationModeSelector setShowModes={setShowModes} />
      ) : (
        <Dropzone
          multiple
          onDrop={async (acceptedFiles) => {
            const formData = new FormData();
            acceptedFiles.forEach((file) => {
              formData.append("files", file);
            });

            progressHandler();
            setLoading(true);
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
                    <CloudIcon className="h-6 w-6 text-zinc-500 mb-2" />
                    <p className="mb-2 text-sm text-zinc-700">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">PDF (up to 50MB)</p>
                  </div>

                  {acceptedFiles && acceptedFiles[0] && (
                    <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                      <div className="px-3 py-2 h-full grid place-items-center">
                        <File02Icon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="px-3 py-2 h-full text-sm truncate">
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  )}

                  {loading && (
                    <div className="w-full mt-4 max-w-xs mx-auto">
                      <ProgressBar
                        indicatorColor={
                          uploadProgress === 100 ? "bg-green-500" : ""
                        }
                        value={uploadProgress}
                      />
                      {uploadProgress === 100 && (
                        <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                          <Loading03Icon className="h-3 w-3 animate-spin" />
                          Redirecting...
                        </div>
                      )}
                    </div>
                  )}

                  {uploadFileState.error && (
                    <div className="flex gap-4 items-center justify-center py-6">
                      <p className="text-danger-500 text-medium">
                        Failed to Upload files
                      </p>
                      <FileBlockIcon size={20} className="text-danger-500" />
                    </div>
                  )}

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
      )}
    </>
  );
};

interface CustomTagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function CategorizationModeSelector({ setShowModes }: any) {
  const categorizationOptions: CategorizationOption[] = [
    {
      id: "general",
      title: "General",
      description: "Let us categorize your files for you.",
      icon: File01Icon,
    },
    {
      id: "basic",
      title: "basic",
      description: "Choose from a list of basic tags to categorize your files.",
      icon: File02Icon,
    },
    {
      id: "custom",
      title: "Custom",
      description: "Choose your own tags to categorize your files.",
      icon: File02Icon,
    },
  ];

  const [mode, setMode] = useState<CategorizationMode>("general");
  const [customTags, setCustomTags] = useState<string[]>([]);

  const handleSave = () => {
    console.log("Selected mode:", mode);
    console.log("Custom tags:", customTags);
    setShowModes(false);
  };

  return (
    <div className="border p-5 flex flex-col gap-4 w-[500px] m-4 border-dashed bg-white border-gray-300 rounded-lg">
      <div>
        {categorizationOptions.map((option) => (
          <ModeCard
            key={option.id}
            option={option}
            isSelected={mode === option.id}
            onClick={() => setMode(option.id)}
            isCustomMode={option.id === "custom"}
            customTags={customTags}
            onAddTag={(tag) => setCustomTags([...customTags, tag])}
            onRemoveTag={(tag) =>
              setCustomTags(customTags.filter((t) => t !== tag))
            }
          />
        ))}
      </div>

      <Button color="primary" size="lg" onClick={handleSave} className="w-full">
        Save Categorization Settings
      </Button>
    </div>
  );
}
interface CustomTagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function CustomTagInput({
  tags,
  onAddTag,
  onRemoveTag,
}: CustomTagInputProps) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className=" flex flex-col gap-2 mt-1">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          isIconOnly
          color="primary"
          onClick={handleAddTag}
          isDisabled={!newTag.trim()}
        >
          <PlusMinus01Icon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            onClose={() => onRemoveTag(tag)}
            variant="flat"
            color="primary"
          >
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

interface ModeCardProps {
  option: CategorizationOption;
  isSelected: boolean;
  onClick: () => void;
  isCustomMode?: boolean;
  customTags?: string[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
}

export function ModeCard({
  option: { title, description, icon: Icon },
  isSelected,
  onClick,
  isCustomMode,
  customTags = [],
  onAddTag,
  onRemoveTag,
}: ModeCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg transition-all duration-400 ease-in-out cursor-pointer ${
        isSelected ? "border-primary bg-primary-50" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div className="p-2 rounded-md bg-primary-100">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="w-full">
          {isCustomMode && isSelected && onAddTag && onRemoveTag ? (
            <CustomTagInput
              tags={customTags}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
            />
          ) : (
            <div className="flex flex-col w-full justify-between items-start">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

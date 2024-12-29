import { CategorizationMode, CategorizationOption } from "@/types/types";
import { Button, Chip, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  AiGenerativeIcon,
  EarthIcon,
  File01Icon,
  File02Icon,
  PencilEdit01Icon,
  PlusMinus01Icon,
} from "hugeicons-react";
import { toast } from "sonner";

interface CustomTagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

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
      icon: EarthIcon,
    },
    {
      id: "basic",
      title: "basic",
      description: "Choose from a list of basic tags to categorize your files.",
      icon: AiGenerativeIcon,
    },
    {
      id: "custom",
      title: "Custom",
      description: "Choose your own tags to categorize your files.",
      icon: PencilEdit01Icon,
    },
  ];

  const [mode, setMode] = useState<CategorizationMode>("general");
  const [customTags, setCustomTags] = useState<string[]>([]);

  const handleSave = () => {
    setShowModes(false);
    localStorage.setItem("categorizationMode", mode);
    localStorage.setItem("customTags", JSON.stringify(customTags));
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

export function CustomTagInput({
  tags,
  onAddTag,
  onRemoveTag,
}: CustomTagInputProps) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (tags.length >= 5) return toast.error("You can only add up to 5 tags");
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") 
      handleAddTag();
  };

  return (
    <div className=" flex flex-col gap-2 mt-1">
      <div className="flex gap-2">
        <input
          className="w-full rounded-lg outline-none text-gray-700 px-3 pt-1 border border-gray-300"
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

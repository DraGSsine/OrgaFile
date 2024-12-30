import {
  CategorizationMode,
  CategorizationOption,
  CustomTagInputProps,
  ModeCardProps,
} from "@/types/types";
import { Button, Card, CardBody, Chip, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  Add01Icon,
  AiGenerativeIcon,
  Cancel01Icon,
  Cancel02Icon,
  EarthIcon,
  PencilEdit01Icon,
  PlusMinus01Icon,
  Tag02Icon,
  TagsIcon,
} from "hugeicons-react";
import { toast } from "sonner";

export function CategorizationModeSelector({ setShowModes }: any) {
  const categorizationOptions: CategorizationOption[] = [
    {
      id: "general",
      title: "General Categorization",
      description:
        "Automatically categorize your files into predefined categories.",
      icon: EarthIcon,
    },
    {
      id: "custom",
      title: "Custom Categorization",
      description: "Add your own tags to categorize your files based on them.",
      icon: PencilEdit01Icon,
    },
  ];

  // Initialize state from localStorage if available
  const [mode, setMode] = useState<CategorizationMode>(() => {
    const savedMode = localStorage.getItem("categorizationMode");
    return (savedMode as CategorizationMode) || "general";
  });

  const [customTags, setCustomTags] = useState<string[]>(() => {
    const savedTags = localStorage.getItem("customTags");
    return savedTags ? JSON.parse(savedTags) : [];
  });

  const handleSave = () => {
    localStorage.setItem("categorizationMode", mode);
    localStorage.setItem("customTags", JSON.stringify(customTags));
    setShowModes(false);
  };

  const handleAddTag = (newTag: string) => {
    const updatedTags = [...customTags, newTag];
    setCustomTags(updatedTags);
    // Immediately update localStorage when tags change
    localStorage.setItem("customTags", JSON.stringify(updatedTags));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = customTags.filter((tag) => tag !== tagToRemove);
    setCustomTags(updatedTags);
    // Immediately update localStorage when tags change
    localStorage.setItem("customTags", JSON.stringify(updatedTags));
  };

  return (
    <div className="border min-h-80 justify-between p-5 flex flex-col gap-4 max-w-[500px] m-4 border-dashed bg-white border-gray-300 rounded-lg">
      <div className="flex flex-col gap-4">
        {categorizationOptions.map((option) => (
          <ModeCard
            key={option.id}
            option={option}
            isSelected={mode === option.id}
            onClick={() => setMode(option.id)}
            isCustomMode={option.id === "custom"}
            customTags={customTags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        ))}
      </div>

      <Button color="primary" size="lg" onClick={handleSave} className="w-full">
        Save Categorization Settings
      </Button>
    </div>
  );
}

interface TagInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function TagInputField({
  value,
  onChange,
  onKeyDown,
}: TagInputFieldProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Enter a tag..."
      startContent={<TagsIcon className="text-default-400 w-4 h-4" />}
      size="sm"
      variant="flat"
      classNames={{
        input: "text-small",
        inputWrapper: "shadow-none bg-transparent hover:bg-default-100",
      }}
    />
  );
}

interface TagProps {
  label: string;
  onRemove: () => void;
}

export function Tag({ label, onRemove }: TagProps) {
  return (
    <Chip
      variant="flat"
      color="primary"
      radius="sm"
      onClose={onRemove}
      classNames={{
        base: "bg-primary-50 hover:bg-primary-100 transition-colors",
        content: "text-small font-normal text-primary",
        closeButton: "text-primary",
      }}
      endContent={<Cancel01Icon className="w-3 h-3" />}
    >
      {label}
    </Chip>
  );
}

export interface TagInputProps extends CustomTagInputProps {
  tags: string[];
  onAddTag: (newTag: string) => void;
  onRemoveTag: (tagToRemove: string) => void;
}

export function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (tags.length >= 5) {
      alert("You can only add up to 5 tags");
      return;
    }
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <TagInputField
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          isIconOnly
          color="primary"
          onClick={handleAddTag}
          isDisabled={!newTag.trim()}
          size="sm"
          variant="light"
          className="min-w-8"
        >
          <Add01Icon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.length === 0 ? (
          <>
            <Tag label="Tech" onRemove={() => {}} />
            <Tag label="Sports" onRemove={() => {}} />
          </>
        ) : (
          tags.map((tag) => (
            <Tag key={tag} label={tag} onRemove={() => onRemoveTag(tag)} />
          ))
        )}
      </div>
    </div>
  );
}

interface ModeHeaderProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function ModeHeader({
  title,
  description,
  icon: Icon,
}: ModeHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-md bg-primary-100/50">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-medium font-medium text-default-700">{title}</h3>
        <p className="text-small text-default-500">{description}</p>
      </div>
    </div>
  );
}

export function ModeCard({
  option,
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
      className={`p-4 min-h-[105px] flex flex-col rounded-lg transition-all duration-200 cursor-pointer border ${
        isSelected
          ? "border-primary bg-primary-50/30"
          : "border-default-200 hover:border-primary-200 hover:bg-default-50"
      }`}
    >
      {isCustomMode && isSelected && onAddTag && onRemoveTag ? (
        <TagInput
          tags={customTags}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />
      ) : (
        <ModeHeader
          title={option.title}
          description={option.description}
          icon={option.icon}
        />
      )}
    </div>
  );
}

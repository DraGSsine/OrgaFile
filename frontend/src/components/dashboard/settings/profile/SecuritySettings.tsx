"use client";
import { Input, Button } from "@nextui-org/react";
import { CirclePasswordIcon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { UpdateProfilePassword } from "@/redux/slices/settingsSlice";
import { toast } from "sonner";
import { useState } from "react";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters")
      .max(30, "Current password must be at most 30 characters"),
    newPassword: z
      .string()
      .min(8, "New assword must be at least 8 characters")
      .max(30, "New password must be at most 30 characters"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export function SecuritySettings() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange =
    (name: keyof PasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data with Zod
      const validatedData = passwordSchema.parse(formData);

      const result = await dispatch(UpdateProfilePassword(validatedData));

      if (UpdateProfilePassword.fulfilled.match(result)) {
        // Reset form
        setFormData({ currentPassword: "", newPassword: "" });
        toast.success("Password updated successfully");
      } else if (UpdateProfilePassword.rejected.match(result)) {
        const errorMessage = Array.isArray(result.payload)
          ? result.payload[0]
          : "Failed to update password. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Password update error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="rounded-xl space-y-5 bg-white shadow-sm ring-1 ring-gray-200 p-6 flex flex-col col-start-5 col-end-8 ">
      <div className="flex gap-3 items-center">
        <div className="rounded-full bg-primary/10 p-3">
          <CirclePasswordIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-semibold">Change Password</p>
          <p className="text-small text-default-500 hidden 2xl:block">
            Update your account password
          </p>
        </div>
      </div>
      <div className="flex-grow">
        <div className="h-full flex flex-col gap-4">
          <PasswordInput
            name="currentPassword"
            label="Current Password"
            value={formData.currentPassword}
            onChange={handleInputChange("currentPassword")}
          />
          <PasswordInput
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={handleInputChange("newPassword")}
          />
          <Button onClick={handleSubmit} color="primary" type="submit" className="w-full mt-auto ">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PasswordInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInput({ name, label, value, onChange }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      name={name}
      size="sm"
      className=" flex items-center"
      endContent={
        <button
          className="focus:outline-none flex items-center justify-center"
          type="button"
          onClick={toggleVisibility}
        >
          {!isVisible ? (
            <ViewOffIcon
              width="25"
              height="25"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            <ViewIcon
              width="25"
              height="25"
              className="text-2xl text-default-400 pointer-events-none"
            />
          )}
        </button>
      }
      isRequired
      label={label}
      type={isVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
      errorMessage=""
    />
  );
}

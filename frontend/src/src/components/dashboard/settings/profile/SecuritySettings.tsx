"use client";
import { Card, CardHeader, CardBody, Input, Button, Modal, ModalContent, ModalFooter, ModalBody } from "@nextui-org/react";
import { Alert02Icon, CirclePasswordIcon, LockIcon, Shield01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import { FieldError, useForm } from "react-hook-form";
import { ZodIssue, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { UpdateProfilePassword } from "@/redux/slices/settingsSlice";
import { toast } from "sonner";
import { useState } from "react";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 8 characters").max(30),
  newPassword: z.string().min(6, "Password must be at least 8 characters").max(30),
})

type PasswordFormData = z.infer<typeof passwordSchema>;

export function SecuritySettings() {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordChange = (data: PasswordFormData) => {
    dispatch(UpdateProfilePassword(data)).then((res) => {
      if (UpdateProfilePassword.fulfilled.match(res)) {
        reset();
        return toast.success("Password updated successfully");
      }

      // Handle rejection with a specific error message
      if (UpdateProfilePassword.rejected.match(res)) {
        console.error("Password update error:", res.payload);
        const errorMessage = (res.payload as string[])[0] || "Failed to update password. Please try again.";
        return toast.error(errorMessage);
      }
    }).catch((error) => {
      // Catch any unexpected errors
      console.error("Password update error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    });
  };

  return (
    <div className="rounded-xl space-y-5 bg-white shadow-sm ring-1 ring-gray-200 col-start-5 col-end-8 p-6" >
      <div className="flex gap-3">
        <div className="rounded-full bg-primary/10 p-3">
          <CirclePasswordIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-semibold">Change Password</p>
          <p className="text-small text-default-500">Update your account password</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onPasswordChange)} className="space-y-4">
          <PasswordInput errorState={errors.currentPassword} register={register} errors={errors} label="Current Password" />
          <PasswordInput errorState={errors.newPassword} register={register} errors={errors} label="New Password" />
          <Button color="primary" type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}

function PasswordInput({ errorState, register, errors,label }: { errorState: FieldError | undefined, register: any, errors: any,label:string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(errorState);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      size="sm"
      endContent={
        <button
          className="focus:outline-none flex items-center justify-center"
          type="button"
          onClick={toggleVisibility}
        >
          {!isVisible ? (
            <ViewOffIcon
              width="25"
              height="35"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            < ViewIcon
              width="25"
              height="35"
              className="text-2xl text-default-400 pointer-events-none"
            />
          )}
        </button>
      }
      isRequired
      label={label}
      type={isVisible ? "text" : "password"}
      {...register("newPassword")}
      isInvalid={!!errors.newPassword}
      errorMessage={errors.newPassword?.message}

    />
  );
}
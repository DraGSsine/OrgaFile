"use client";
import { Card, CardHeader, CardBody, Input, Button, Modal, ModalContent, ModalFooter, ModalBody } from "@nextui-org/react";
import { Alert02Icon, LockIcon, Shield01Icon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {  UpdateProfilePassword } from "@/redux/slices/settingsSlice";
import { toast } from "sonner";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 8 characters").max(30),
  newPassword: z.string().min(6, "Password must be at least 8 characters").max(30),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

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
    <div className="rounded-xl border bg-gray-50 w-4/12 p-6" >
      <div className="flex gap-3">
        <div className="h-5 w-5 text-primary" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Change Password</p>
          <p className="text-small text-default-500">Update your account password</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onPasswordChange)} className="space-y-4">
          <Input
            type="password"
            label="Current Password"
            variant="bordered"
            {...register("currentPassword")}
            isInvalid={!!errors.currentPassword}
            errorMessage={errors.currentPassword?.message}
          />
          <Input
            type="password"
            label="New Password"
            variant="bordered"
            {...register("newPassword")}
            isInvalid={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />
          <Input
            type="password"
            label="Confirm New Password"
            variant="bordered"
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
          <Button color="primary" type="submit" className="w-full sm:w-auto">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { PasswordFormData } from "@/helpers/profileValidator";
import { Input } from "@nextui-org/react";
import { UseFormReturn } from "react-hook-form";


interface PasswordFormFieldsProps {
  form: UseFormReturn<PasswordFormData>;
}

export function PasswordFormFields({ form }: PasswordFormFieldsProps) {
  const { register, formState: { errors } } = form;

  return (
    <>
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
    </>
  );
}
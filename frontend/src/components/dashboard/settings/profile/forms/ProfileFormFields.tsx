"use client";

import { Input } from "@nextui-org/react";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/lib/validations/profile";

interface ProfileFormFieldsProps {
  form: UseFormReturn<ProfileFormData>;
}

export function ProfileFormFields({ form }: ProfileFormFieldsProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input
        label="First Name"
        placeholder="John"
        variant="bordered"
        {...register("firstName")}
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        placeholder="Doe"
        variant="bordered"
        {...register("lastName")}
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        variant="bordered"
        className="sm:col-span-2"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
    </div>
  );
}
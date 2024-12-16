"use client";

import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { LockIcon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormFields } from "./PasswordFormFields";
import { PasswordFormData, passwordSchema } from "@/helpers/profileValidator";

export function PasswordForm() {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordChange = (data: PasswordFormData) => {
    console.log(data);
    // Handle password change
  };

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <LockIcon className="h-5 w-5 text-primary" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Change Password</p>
          <p className="text-small text-default-500">Update your account password</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={form.handleSubmit(onPasswordChange)} className="space-y-4">
          <PasswordFormFields form={form} />
          <Button color="primary" type="submit" className="w-full sm:w-auto">
            Update Password
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
"use client";

import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProfileFormFields } from "./ProfileFormFields";
import { ProfileFormData, profileSchema } from "@/helpers/profileValidator";

export function ProfileForm() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Card className="mt-6">
      <CardBody className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ProfileFormFields form={form} />
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="bordered">Cancel</Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
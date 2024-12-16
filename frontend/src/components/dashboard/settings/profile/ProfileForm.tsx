"use client";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { UpdateProfileInfo } from "@/redux/slices/settingsSlice";
import { toast } from "sonner";
import { updateUserInfo } from "@/redux/slices/authSlice";

// Modified schema to make all fields optional and remove the refine method
const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileFormData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== '')
    );
    if (Object.keys(cleanedData).length > 0) {
      dispatch(UpdateProfileInfo(cleanedData)).then((res) => {
      dispatch(updateUserInfo({fullName: cleanedData.firstName + " " + cleanedData.lastName}));
        if (UpdateProfileInfo.fulfilled.match(res)) {
          return toast.success("Profile updated successfully");
        }

      }
      );
    } else {
      toast.error("No fields to update");
    }
  };

  return (
    <Card className="mt-6">
      <CardBody className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              isReadOnly
              className="sm:col-span-2 hover:border-gray-50 disabled:hover:border-gray-50"
              disabled
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
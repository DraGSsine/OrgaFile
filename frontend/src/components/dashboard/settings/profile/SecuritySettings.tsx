"use client";
import { Card, CardHeader, CardBody, Input, Button, Modal, ModalContent, ModalFooter, ModalBody } from "@nextui-org/react";
import { Alert02Icon, LockIcon, Shield01Icon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { DeleteProfile, UpdateProfilePassword } from "@/redux/slices/settingsSlice";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

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
    <Card>
      <CardHeader className="flex gap-3">
        <LockIcon className="h-5 w-5 text-primary" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Change Password</p>
          <p className="text-small text-default-500">Update your account password</p>
        </div>
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}

export const ProfileDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ConfirmDeleteProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Card className="mt-6">
        <CardHeader className="flex gap-3">
          <Shield01Icon className="h-5 w-5 text-danger" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Account Deletion</p>
            <p className="text-small text-default-500">Permanently delete your account</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-sm text-default-500">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              color="danger"
              variant="flat"
              className="w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export const ConfirmDeleteProfile = ({isModalOpen, setIsModalOpen}:{ isModalOpen:boolean, setIsModalOpen:Dispatch<SetStateAction<boolean>> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const DeleteMyAccount = () => {
    if (confirmText === "delete") {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(DeleteProfile()).then((res) => {
          if (DeleteProfile.fulfilled.match(res)) {
            setIsModalOpen(false);
            router.push("/auth/login");
            return toast.success("Account deleted successfully");
          }
          if (DeleteProfile.rejected.match(res)) {
            console.error("Account deletion error:", res.payload);
            const errorMessage = (res.payload as string[])[0] || "Failed to delete account. Please try again.";
            return toast.error(errorMessage);
          }
        }).catch((error) => {
          console.error("Account deletion error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        });
      }, 1000);
    } else {
      toast.error("Please type 'delete' to confirm account deletion.");
      setIsLoading(false);
    }
  }
  return (
    <Modal
      classNames={{
        body: "py-6",
        backdrop: "bg-[#fff]/40 backdrop-opacity-40 blur-xs ",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      isDismissable={true}
      isKeyboardDismissDisabled={true}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex items-center justify-center gap-4">
            <div
              className="bg-[#F31260]/15 flex items-center justify-center min-w-14 min-h-14 rounded-full "
            >
              <Alert02Icon className="h-8 w-8 text-[#F31260]"
              />
            </div>
            <div className=" space-y-3">
              <p className=" font-semibold"> Delete Account  </p>
              <p className=" text-sm text-zinc-500">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalBody>
          <Input
            placeholder="Type 'delete' to confirm"
            description="This action cannot be undone."
            label="Confirm"
            type="text"
            onChange={(e) => setConfirmText(e.target.value)}
          />

        </ModalBody>
        <ModalFooter>
          <Button
            color="default"
            variant="light"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            variant="flat"
            onClick={() => DeleteMyAccount()}
            isLoading={isLoading}
          >

            Delete Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
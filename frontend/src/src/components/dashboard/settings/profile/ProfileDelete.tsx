"use client"
import { DeleteProfile } from "@/redux/slices/settingsSlice";
import { AppDispatch } from "@/redux/store";
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { Alert02Icon, Shield01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const ProfileDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ConfirmDeleteProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 col-start-8 col-end-11 p-6 ">
        <div className="flex gap-3">
          <Shield01Icon className="h-5 w-5 text-danger" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Account Deletion</p>
            <p className="text-small text-default-500">Permanently delete your account</p>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </>
  )
}

const ConfirmDeleteProfile = ({isModalOpen, setIsModalOpen}:{ isModalOpen:boolean, setIsModalOpen:Dispatch<SetStateAction<boolean>> }) => {
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
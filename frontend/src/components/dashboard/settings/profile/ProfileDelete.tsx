"use client";
import { resetAuthState } from "@/redux/slices/authSlice";
import { DeleteProfile } from "@/redux/slices/settingsSlice";
import { AppDispatch } from "@/redux/store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { Alert02Icon, Shield01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const ProfileDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ConfirmDeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <div className=" col-start-8 col-end-11 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="mb-6 flex items-center gap-5 ">
                <div className="rounded-full bg-red-50 p-3">
                  <Shield01Icon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Account Deletion
                  </h3>
                  <p className="text-sm text-gray-500 hidden 2xl:block">
                    Permanently delete your data
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-500">
                    <li>Permanently deletes all your data</li>
                    <li>Removes access to all services</li>
                    <li>Cancels any active subscriptions</li>
                  </ul>
                </div>

                <Button
                  color="danger"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-lg  px-4 py-2.5 text-sm font-medium   focus:outline-none focus:ring-2  focus:ring-offset-2 sm:w-auto"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ConfirmDeleteModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const DeleteMyAccount = () => {
    if (confirmText === "delete") {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(DeleteProfile())
          .then((res) => {
            if (DeleteProfile.fulfilled.match(res)) {
              setIsModalOpen(false);
              router.push("/pricing");
              localStorage.removeItem("plan");
              dispatch(resetAuthState());
              return toast.success("Account deleted successfully");
            }
            if (DeleteProfile.rejected.match(res)) {
              console.error("Account deletion error:", res.payload);
              const errorMessage =
                (res.payload as string[])[0] ||
                "Failed to delete account. Please try again.";
              return toast.error(errorMessage);
            }
          })
          .catch((error) => {
            console.error("Account deletion error:", error);
            toast.error("An unexpected error occurred. Please try again.");
          });
      }, 1000);
    } else {
      toast.error("Please type 'delete' to confirm account deletion.");
      setIsLoading(false);
    }
  };
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
            <div className="bg-[#F31260]/15 flex items-center justify-center min-w-14 min-h-14 rounded-full ">
              <Alert02Icon className="h-8 w-8 text-[#F31260]" />
            </div>
            <div className=" space-y-3">
              <p className=" font-semibold"> Delete Account </p>
              <p className=" text-sm text-zinc-500">
                Are you sure you want to delete your account? This action cannot
                be undone.
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
            onClick={() => DeleteMyAccount()}
            isLoading={isLoading}
          >
            Delete Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignoutModal } from "@/redux/slices/dashboardSlice";
import { SignOutAction } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Alert02Icon } from "hugeicons-react";
import Link from "next/link";

const SignoutModal = () => {
  const router = useRouter();
  const { SignoutModal } = useSelector((state: RootState) => state.dashboard);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(SignOutAction()).then(() => {
        dispatch(closeSignoutModal());
        router.push("/auth/signin");
        setLoading(false);
      });
    }, 1000);
  };
  return (
    <div className=" -z-50 absolute inset-0">
      <Modal
        backdrop="blur"
        isOpen={SignoutModal.isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        classNames={{
          backdrop: "bg-[#fff] bg-opacity-50 backdrop-opacity-50 blur-xs",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-red-100 flex items-center justify-center min-w-14 min-h-14 rounded-full ">
                    <Alert02Icon className=" text-red-500" />
                  </div>
                  <div className=" space-y-3">
                    <p className=" font-semibold"> Sign Out </p>
                    <p className=" font-normal text-sm text-zinc-500">
                      Are you sure you would like to sign out of your{" "}
                      <Link href="/">OrgaFile</Link>
                      account?
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => dispatch(closeSignoutModal())}
                >
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  color="danger"
                  onPress={handleSignOut}
                >
                  Signout {loading}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignoutModal;

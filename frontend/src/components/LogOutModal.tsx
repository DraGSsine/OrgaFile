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
import { closeLogOutModal } from "@/redux/slices/dashboardSlice";
import { SignOutAction } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const LogOutModal = () => {
  const router = useRouter();
  const { logOutModal } = useSelector((state: RootState) => state.dashboard);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    console.log("signing out");
    setLoading(true);
    dispatch(SignOutAction()).then(() => {
      dispatch(closeLogOutModal());
      router.push("/auth/signin");
      setLoading(false);
    });
  };
  return (
    <div className=" absolute inset-0">
      <Modal
        isOpen={logOutModal.isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign Out Confirmation
              </ModalHeader>
              <ModalBody>Are you sure you want to sign out?</ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => dispatch(closeLogOutModal())}
                >
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  color="danger"
                  onPress={handleSignOut}
                >
                  Action {loading}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LogOutModal;

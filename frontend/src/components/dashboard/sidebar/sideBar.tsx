"use client";

import { useState, useEffect } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { SidebarContent } from "./sidebarContent";
import { MobileTrigger } from "./mobileTrigger";
import { cn } from "@nextui-org/react";
import { showUsageModalType } from "@/types/types";
import { StorageUsage } from "../rightSideBar/StorageUsage";

import { CreditsUsage } from "../rightSideBar/CreditstUsage";
import { CancelCircleIcon, XingIcon } from "hugeicons-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showUsageModal, setShowUsageModal] = useState<showUsageModalType>({
    open: false,
    modal: "storage",
  });
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCollapsed(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  return (
    <>
      <MobileTrigger isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, x: "-100%" }}
            animate={{
              width:'fit-content',
              x: 0,
            }}
            exit={{
              width: 0,
              x: "-100%",
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.3,
            }}
            className="z-40 bg-white absolute left-0 top-0 h-screen border overflow-hidden md:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className=
        "h-screen flex-col border-r bg-background transition-all duration-300 hidden md:flex col-start-1 col-end-2 xl:col-end-3 "


      >
        <SidebarContent
          setShowUsageModal={setShowUsageModal}
          ShowUsageModal={showUsageModal}
        />
        <Modal
          isOpen={showUsageModal.open}
          onClose={() =>
            setShowUsageModal({ open: false, modal: showUsageModal.modal })
          }
        >
          <ModalContent>
            <div className="flex items-center justify-center h-full">
              {showUsageModal.modal === "storage" && <StorageUsage />}
              {showUsageModal.modal === "credits" && <CreditsUsage />}
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

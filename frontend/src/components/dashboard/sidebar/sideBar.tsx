"use client";

import { useState, useEffect } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { SidebarContent } from "./sidebarContent";
import { MobileTrigger } from "./mobileTrigger";
import { cn } from "@nextui-org/react";
import { showUsageModalType } from "@/types/types";
import { StorageUsage } from "../rightSideBar/StorageUsage";

import { RequestUsage } from "../rightSideBar/ReqesutUsage";
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

  if (isMobile) {
    return (
      <div>
        <MobileTrigger isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, x: "-100%" }}
              animate={{
                width: "50%",
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
              className="z-40 bg-white absolute left-0 top-0 h-screen border overflow-hidden"
            >
              <SidebarContent isCollapsed={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? " col-start-1 col-end-2 " : " col-start-1 col-end-3 "
      )}
    >
      <SidebarContent
        isCollapsed={isCollapsed}
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
            {showUsageModal.modal === "request" && <RequestUsage />}
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { SidebarContent } from "./sidebar-content";
import { MobileTrigger } from "./mobile-trigger";
import { cn } from "@nextui-org/react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <div className="absolute top-6 left-4">
        <MobileTrigger onOpen={onOpen} />
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="auto"
          classNames={{
            wrapper: "!items-start",
            base: "!m-0 h-full !rounded-none",
          }}
        >
          <ModalContent className="h-full w-72 p-0">
            <SidebarContent isCollapsed={false} isMobile />
          </ModalContent>
        </Modal>
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
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
}
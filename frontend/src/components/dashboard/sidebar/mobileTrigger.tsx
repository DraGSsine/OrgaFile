"use client";

import { Button } from "@nextui-org/button";
import { Cancel01Icon, Menu01Icon } from "hugeicons-react";

interface MobileTriggerProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function MobileTrigger({ isOpen, onOpen, onClose }: MobileTriggerProps) {
  return (
    <button
      className="md:hidden absolute top-[3%] left-4 z-50"
     
    >
      {!isOpen ? (
        <Menu01Icon onClick={onOpen} className="h-6 w-6" />
      ) : (
        <Cancel01Icon onClick={onClose} className="h-6 w-6" />
      )}
    </button>
  );
}

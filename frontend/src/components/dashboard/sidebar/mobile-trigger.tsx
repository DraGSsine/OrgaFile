"use client";

import { Button } from "@nextui-org/button";
import { Menu01Icon } from "hugeicons-react";


interface MobileTriggerProps {
  onOpen: () => void;
}

export function MobileTrigger({ onOpen }: MobileTriggerProps) {
  return (
    <Button
      isIconOnly
      variant="light"
      className="md:hidden"
      onClick={onOpen}
    >
      <Menu01Icon className="h-6 w-6" />
    </Button>
  );
}
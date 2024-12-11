"use client";

import { Link } from "@nextui-org/link";
import { cn } from "@nextui-org/react";
import { Files01Icon } from "hugeicons-react";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2 font-bold text-2xl transition-all duration-300",
        isCollapsed && "justify-center"
      )}
    >
      <Files01Icon className="h-8 w-8 text-primary" />
      {!isCollapsed && (
        <>
          <span className="text-primary">Orga</span>
          <span className="text-default-600">File</span>
        </>
      )}
    </Link>
  );
}
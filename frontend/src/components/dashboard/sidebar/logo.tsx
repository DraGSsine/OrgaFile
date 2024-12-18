"use client";

import { Link } from "@nextui-org/link";
import { cn } from "@nextui-org/react";
import { Files01Icon } from "hugeicons-react";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-2xl transition-all duration-300"
    >
      {/* <Files01Icon className="h-8 w-8 text-primary" /> */}

      <div className=" flex flex-col xl:flex-row gap-1" >
        <span className="text-primary hidden xl:flex">Orga</span>
        <span className="text-default-600 hidden xl:flex ">File</span>
      </div>

    </Link>
  );
}
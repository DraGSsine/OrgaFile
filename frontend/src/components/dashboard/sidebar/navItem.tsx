"use client";

import Link from "next/link";
import { cn } from "@nextui-org/react";
import { FC, RefAttributes } from "react";
import { HugeiconsProps } from "hugeicons-react";

interface NavItemProps {
  href: string;
  name: string;
  icon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
  isActive: boolean;
}

export function NavItem({ href, name, icon: Icon, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all sm:justify-center xl:justify-start",
        isActive
          ? "bg-primary-100 text-primary-color"
          : "text-default-600 hover:bg-default-100"
      )}
    >
      <Icon size={22} className="shrink-0" />
      <span className="font-medium sm:hidden xl:flex ">{name}</span>
    </Link>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";


export function Logo(props:any) {
  return (
    <Link
      href="/"
      className="flex items-center justify-center font-extrabold xl:gap-2 text-3xl transition-all duration-300"
    >
      <Image className="" src="/logo.svg" {...props} />
    </Link>
  );
}

import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ArrowRight } from "../../public/icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
const NavBar = () => {
  return (
    <MaxWidthWrapper>
      <nav className=" h-[10vh] justify-between items-center flex">
        <Link href="/">
          <Image src="/doctify.svg" alt="logo" width={100} height={100} />
        </Link>
        <div className=" flex items-center gap-6 capitalize">
          <Link href="/pricing">
            <p className="text-medium text-primary-color font-medium ">
              pricing
            </p>
          </Link>
          <Link href="/auth/signin">
            <p className="text-medium text-primary-color font-medium ">
              Sign In
            </p>
          </Link>
          <div className=" space-x-4">
            <Link href="/auth/signup">
              <Button
                endContent={<ArrowRight />}
                variant="solid"
                radius="full"
                className="bg-primary-color text-zinc-50 w-36 text-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;

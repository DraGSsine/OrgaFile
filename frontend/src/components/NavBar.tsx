import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";
import { ArrowRight } from "../../public/icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
const NavBar = () => {
  return (
    <MaxWidthWrapper>
      <header className="astronav-sticky-header sticky top-0 border-b z-20 transition-all py-5 border-transparent">
        <div className="max-w-screen-xl mx-auto px-5">
          <div
            className="flex flex-col lg:flex-row justify-between items-center relative z-10"
            data-astro-transition-scope="astro-o7bz76pi-1"
          >
            <div className="flex w-full lg:w-auto items-center justify-between">
              <Link
                href="/"
                className="text-xl flex items-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full px-2 -ml-2"
              >
                <span className="font-bold text-indigo-600">Doc</span>
                <span className="text-slate-600">Tify</span>
              </Link>
            </div>
            <nav className="astronav-items astronav-toggle hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0">
              <ul className="flex flex-col lg:flex-row lg:gap-3">
                <li>
                  <Link
                    href="/pricing"
                    className="flex  lg:px-3 py-2 text-medium text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex lg:px-3 py-2 text-medium text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="flex lg:px-3 py-2 text-medium text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex lg:px-3 py-2 text-medium text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className="text-medium px-2 py-1 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                >
                  Log in
                </Link>
                <Link href="/auth/signup">
                  <Button
                    endContent={<ChevronRight />}
                    variant="flat"
                    radius="full"
                    className=" bg-indigo-600 text-zinc-50 text-medium"
                  >
                    Join Us Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </MaxWidthWrapper>
  );
};

export default NavBar;

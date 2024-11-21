"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import NavBarLinks from "./NavBarLinks";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  Link,
  Button,
} from "@nextui-org/react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className=" py-2 "
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:flex" justify="start">
        <NavbarBrand>
          <Link
            href="/"
            className="text-3xl font-semibold flex items-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full px-2 -ml-2"
          >
            <span className="font-bold text-primary-500">Orga</span>
            <span className="text-slate-600">File</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4" justify="center">
        <NavBarLinks />
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4" justify="end">
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-medium sm:px-2 py-1 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
          >
            log in
          </Link>
          <Link href="/auth/signup">
            <Button
              endContent={<ChevronRight size={20} />}
              variant="flat"
              radius="full"
              className="bg-primary-500 text-zinc-50"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </NavbarContent>

      <NavbarMenu className="sm:hidden">
        <div className="flex flex-col">
          <Link href="/">
            <Button
              variant="flat"
              radius="full"
              className="bg-white-500 text-primary-500"
            >
              Home
            </Button>
          </Link>

          <Link href="/pricing">
            <Button
              variant="flat"
              radius="full"
              className="bg-white-500 text-primary-500"
            >
              Pricing
            </Button>
          </Link>

          <Link href="/legal">
            <Button
              variant="flat"
              radius="full"
              className="bg-white-500 text-primary-500"
            >
              Legal
            </Button>
          </Link>
        </div>
        <div className=" flex space-y-3 flex-col">
          <Link href="/auth/signin">
            <Button
              endContent={<ChevronRight size={20} />}
              variant="flat"
              radius="full"
              className="bg-zinc-200 text-primary-500"
            >
              Log in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              endContent={<ChevronRight size={20} />}
              variant="flat"
              radius="full"
              className="bg-primary-500 text-zinc-50"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;

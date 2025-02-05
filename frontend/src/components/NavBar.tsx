"use client";
import React, { useState } from "react";
import NavBarLinks from "./NavBarLinks";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { Logo } from "./dashboard/sidebar/logo";

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
        <li className="w-8 h-8 ">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </li>
      </NavbarContent>

      <NavbarContent className="sm:flex" justify="start">
        <li>
          <NavbarBrand className="flex justify-end sm:justify-start">
            <Logo alt="logo" width={200} height={50} />
          </NavbarBrand>
        </li>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4" justify="center">
        <li>
          <NavBarLinks />
        </li>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4" justify="end">
        <li className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-medium sm:px-2 py-1 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
          >
            log in
          </Link>

          <Link
            href="/pricing"
            className=" flex items-center justify-center p-2 rounded-full px-4 transition-all duration-300 ease-in hover:opacity-90 text-white bg-primary-color"
          >
            Get Started
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </li>
      </NavbarContent>

      <NavbarMenu className="sm:hidden">
        <div className="flex flex-col">
          <Link href="/">
            <Button
              variant="flat"
              radius="full"
              className="bg-white text-primary-color"
            >
              Home
            </Button>
          </Link>

          <Link href="/pricing">
            <Button
              variant="flat"
              radius="full"
              className="bg-white text-primary-color"
            >
              Pricing
            </Button>
          </Link>

          <Link href="/legal">
            <Button
              variant="flat"
              radius="full"
              className="bg-white text-primary-color"
            >
              Legal
            </Button>
          </Link>
        </div>
        <div className=" flex space-y-3 flex-col">
          <Link href="/auth/signin">
            <Button
              endContent={<ArrowRight01Icon size={20} />}
              variant="flat"
              radius="full"
              className="bg-zinc-200 text-primary-color"
            >
              Log in
            </Button>
          </Link>
          <Link
            href="/pricing"
            className=" flex items-center justify-center p-2 rounded-full px-4 transition-all duration-300 ease-in hover:opacity-90 text-white bg-primary-color"
          >
            Get Started
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;

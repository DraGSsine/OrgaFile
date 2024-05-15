"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const UserProfile = () => {
  const router = useRouter();
  const handleItemSelect = (e: string | number) => {
    if (e === "logout") {
      Cookies.remove("token");
      router.push("/auth/signin");
    }
  };
  return (
    <Dropdown className=" cursor-pointer" placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          color="primary"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => handleItemSelect(key)}
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfile;

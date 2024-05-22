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
  const email = Cookies.get("email");
  const router = useRouter();
  const handleItemSelect = (e: string | number) => {
    if (e === "logout") {
      Cookies.remove("token");
      router.push("/auth/signin");
    } else if (e === "settings") router.push("/dashboard/settings");
    else if (e === "help") router.push("/help");
  };
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
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
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="help">Help</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfile;

"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { openSignoutModal } from "@/redux/slices/dashboardSlice";

const UserProfile = ({
  email,
  profilePicture,
}: {
  email: string;
  profilePicture: string;
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleItemSelect = (e: string | number) => {
    if (e === "signout") {
      dispatch(openSignoutModal());
    } else if (e === "settings") router.push("/dashboard/settings");
    else if (e === "help") window.open("mailto:support@orgafile.com", "_blank");
  };
  console.log("profilePicture", profilePicture);
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
        <Avatar isBordered color="primary" src={profilePicture} />
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => handleItemSelect(key)}
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className=" font-medium">
            Signed in as{" "}
            <span className=" text-primary-color font-semibold">
              {email.split("@")[0]}
            </span>
          </p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="help">Help</DropdownItem>
        <DropdownItem key="signout" color="danger" className=" text-danger-500">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfile;

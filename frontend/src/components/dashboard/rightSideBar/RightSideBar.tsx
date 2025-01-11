"use client";
import React from "react";
import {
  Card,
  CardBody,
  Button,
  Progress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { StorageUsage } from "./StorageUsage";
import { CreditstUsage } from "./ReqesutUsage";
import UserOverview from "./UserOverview";
import { HelpCircleIcon } from "hugeicons-react";

const RightSidebar = () => {
  return (
    <aside className=" hidden col-start-15 col-end-17 border-l gap-10 xl:flex flex-col">
      {/* User Profile Section */}
      <div className="px-6 h-[8%] py-4 border-b border-divider">
        <UserOverview />
      </div>

      {/* Usage Stats Section */}
      <div className="flex-1 p-6">
        <div className="flex flex-col justify-center items-start mb-6">
          <h2 className="text-lg font-medium">Usage Overview</h2>
          <p className="text-small text-default-500">
            Monitor your resource usage
          </p>
        </div>
        <div className="space-y-4">
          <StorageUsage />
          <CreditstUsage />
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t border-divider bg-default-50">
        <Button
          onClick={() => window.open("mailto:support@orgafile.com", "_blank")}
          variant="light"
          className="w-full"
          startContent={<HelpCircleIcon className="w-4 h-4 text-gray-500" />}
        >
          Need help? Contact support
        </Button>
      </div>
    </aside>
  );
};

export default RightSidebar;

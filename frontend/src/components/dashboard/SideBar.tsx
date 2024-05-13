"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DocTifyLogo } from "../../../public/icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  Files,
  FolderMinus,
  LayoutDashboard,
  Settings,
  Trash2,
} from "lucide-react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("");
  const router = usePathname();
  const Components = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={25} />,
    },
    {
      name: "Files",
      icon: <Files size={25} />,
    },
    {
      name: "Repository",
      icon: <FolderMinus size={25} />,
    },
    {
      name: "Trash",
      icon: <Trash2 size={25} />,
    },
    {
      name: "Settings",
      icon: <Settings size={25} />,
    },
  ];

  useEffect(() => {
    const currentPath = router.split("/")[2] || "Dashboard";
    setActiveItem(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
  }, [router]);

  return (
    <div className=" min-w-64 w-64 bg-white border-e border-gray-200 px-6 pt-7 pb-10 flex-col flex justify-between ">
      <div>
        <div className="px-8">
          <DocTifyLogo />
        </div>
        <nav
          className="py-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open=""
        >
          <ul className="space-y-3">
            {Components.map((Component, index) => (
              <li key={index} onClick={() => setActiveItem(Component.name)}>
                <Link
                  className={` flex items-center gap-x-3.5 py-2 pl-3 text-[1.1rem] ${
                    activeItem == Component.name
                      ? "bg-primary-100/70 text-primary-500 "
                      : "text-zinc-500 "
                  } rounded-lg hover:bg-primary-50/50`}
                  href={`/dashboard/${
                    Component.name.toLowerCase() == "dashboard"
                      ? ""
                      : Component.name.toLowerCase()
                  }`}
                >
                  {Component.icon}
                  {Component.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className=" flex flex-col items-center gap-16 ">
        <div className="bg-primary flex flex-col justify-between p-4 rounded-lg gap-2">
          <h1 className="text-2xl text-white font-medium">Go To Premium</h1>
          <p className=" text-sm text-white font-normal leading-6 ">
            Unlock the real power of DocTify with the premium plan
          </p>
          <Button
            radius="sm"
            variant="flat"
            className="text-lg font-semibold p-6 bg-black text-white"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

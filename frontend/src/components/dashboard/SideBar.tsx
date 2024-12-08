"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { OrgaFileLogo } from "../../../public/icons";
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
    <div className=" col-start-1 col-end-3 bg-white border-e border-gray-200 px-6 pt-7 pb-10 flex-col flex justify-between ">
      <div>
        <div className=" px-3 ">
          <Link
            href="/"
            className="text-3xl font-semibold flex items-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full px-2 -ml-2"
          >
            <span className="font-bold text-primary-500">Orga</span>
            <span className="text-slate-600">File</span>
          </Link>
        </div>
        <nav
          className="py-12 w-full flex flex-col flex-wrap"
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
    </div>
  );
};

export default SideBar;

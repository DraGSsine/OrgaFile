"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DocTifyLogo,
} from "../../../public/icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  Files,
  FolderMinus,
  LayoutDashboard,
  LucideLogOut,
  Settings,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const routeName =
    pathname
      .split("/")
      [pathname.split("/").length - 1].charAt(0)
      .toUpperCase() +
    pathname.split("/")[pathname.split("/").length - 1].slice(1);
  const [activeItem, setActiveItem] = useState<string>(routeName);

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
    setActiveItem(routeName);
  }, [routeName]);

  return (
    <div className=" w-64 bg-white border-e border-gray-200 px-6 pt-7 pb-10 flex-col flex justify-between ">
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
              <li onClick={() => setActiveItem(Component.name)}>
                <Link
                  className={` flex items-center gap-x-3.5 py-2 pl-3 text-[1.1rem] ${
                    activeItem == Component.name ? "bg-primary-100/70 text-primary-500 " : "text-zinc-500 "
                  } rounded-lg hover:bg-primary-50/50`}
                  href={`/dashboard/${
                    Component.name.toLowerCase() == "dashboard"
                      ? ""
                      : Component.name.toLowerCase()
                  }`}
                >
                  {Component.icon}
                  {Component.name }
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className=" flex flex-col items-center gap-16 ">
        <div className="bg-primary flex flex-col justify-between p-4 rounded-lg gap-2">
          <h1 className="text-lg text-white font-semibold">Go To Premium</h1>
          <p className="text-[1.1rem] text-white">
            Get full speed and additional storage, as well as various exclusive
            features
          </p>
          <Button
            radius="sm"
            variant="flat"
            className="text-lg font-semibold p-6 bg-black text-white"
          >
            Upgrade
          </Button>
        </div>
        <div>
          <Button
            onClick={() => dispatch(logOut()) }
            radius="sm"
            variant="light"
            className="text-black text-[1.1rem] font-medium flex justify-between"
          >
            <LucideLogOut size={25} />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

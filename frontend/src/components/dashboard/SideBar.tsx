"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  DeleteIcon,
  DocTifyLogo,
  FolderIcon,
  LogOut,
  SettingsIcon,
  StarIcon,
} from "../../../public/icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const SideBar = () => {
  const pathname = usePathname();
  const routeName = pathname.split("/")[pathname.split("/").length - 1].charAt(0).toUpperCase() + pathname.split("/")[pathname.split("/").length - 1].slice(1);
  const [activeItem, setActiveItem] = useState<string>(routeName);
  const [animation, setAnimation] = useState<string>("-top-[11px]");
  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "Dashboard") setAnimation("-top-[11px]");
    else if (item === "Files") setAnimation("top-[67px]");
    else if (item === "Favorite") setAnimation("top-[140px]");
    else if (item === "Trash") setAnimation("top-[214px]");
    else if (item === "Settings") setAnimation("top-[288px]");
  };
  const Components = [
    {
      name: "Dashboard",
      component: (
        <DashboardIcon
          width={35}
          height={35}
          outline={activeItem === "Dashboard" ? false : true}
          className={"transition-colors duration-300"}
        />
      ),
    },
    {
      name: "Files",
      component: (
        <FolderIcon
          width={35}
          height={35}
          outline={activeItem === "Files" ? false : true}
          className={"transition-colors duration-300"}
        />
      ),
    },
    {
      name: "Favorite",
      component: (
        <StarIcon
          width={35}
          height={35}
          outline={activeItem === "Favorite" ? false : true}
          className={"transition-colors duration-300"}
        />
      ),
    },
    {
      name: "Trash",
      component: (
        <DeleteIcon
          width={35}
          height={35}
          outline={activeItem === "Trash" ? false : true}
          className={"transition-colors duration-300"}
        />
      ),
    },
    {
      name: "Settings",
      component: (
        <SettingsIcon
          width={35}
          height={35}
          outline={activeItem === "Settings" ? false : true}
          className={"transition-colors duration-300"}
        />
      ),
    },
  ];

  useEffect(() => {
      handleItemClick(routeName);
  }, [routeName]);

  return (
    <div className="border-r pr-5 h-screen flex flex-col">
      <div>
        <DocTifyLogo />
      </div>
      <div className="w-[12vw] py-8 flex flex-col h-auto justify-between flex-grow">
        <div className="gap-10 flex flex-col relative">
          {Components.map((Component, index) => (
            <Link
              href={
                Component.name.toLocaleLowerCase() == "dashboard"
                  ? "/dashboard"
                  : `/dashboard/${Component.name.toLowerCase()}`
              }
              key={index}
              className={`flex gap-4 items-center cursor-pointer`}
            >
              {Component.component}
              <span
                className={`font-semibold text-[1.1rem] ${
                  activeItem === Component.name
                    ? "text-black transition-all duration-1000 "
                    : "text-primary-text-color"
                }`}
              >
                {Component.name}
              </span>
            </Link>
          ))}
          <div
            className={`${animation} transition-all ease-in-out -right-5 absolute h-[60px] w-[6px] rounded-l-full bg-black`}
          ></div>
        </div>
        <div className="space-y-10">
          <div className="bg-primary flex flex-col justify-between p-4 rounded-lg gap-2">
            <h1 className="text-lg text-white font-semibold">Go To Premium</h1>
            <p className="text-sm text-white">
              Get full speed and additional storage, as well as various
              exclusive features
            </p>
            <Button
              radius="sm"
              variant="flat"
              className="text-lg font-semibold p-6 bg-black text-white"
            >
              Upgrade
            </Button>
          </div>
          <Button
            radius="sm"
            variant="light"
            className="text-black text-lg font-semibold flex justify-between"
          >
            <LogOut width={30} height={30} />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { navigation } from "./navigation";
import { Logo } from "./logo";
import { NavItem } from "./navItem";
import {
  Activity01Icon,
  CloudIcon,
  Loading01Icon,
  Loading02Icon,
  Loading03Icon,
  Logout01Icon,
} from "hugeicons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { showUsageModalType } from "@/types/types";
import { StorageUsage } from "../rightSideBar/StorageUsage";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { SignOutAction, resetAuthState } from "@/redux/slices/authSlice";
import { CreditstUsage } from "../rightSideBar/ReqesutUsage";

interface SidebarContentProps {
  setShowUsageModal?: Dispatch<SetStateAction<showUsageModalType>>;
  ShowUsageModal?: showUsageModalType;
}

export function SidebarContent({
  setShowUsageModal,
  ShowUsageModal,
}: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(SignOutAction()).then(() => {
        router.push("/auth/signin");
        setLoading(false);
        dispatch(resetAuthState());
      });
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[8vh] items-center justify-center xl:justify-start xl:px-4 gap-2">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2 px-2 flex justify-between flex-col">
        <div className=" space-y-2">
          {navigation.map((item) => {
            let isActive = false;
            if (item.href == "/dashboard")
              isActive = pathname === item.href;
            else
              isActive = pathname.includes(item.href);
            return (
              <NavItem
                key={item.name}
                href={item.href}
                name={item.name}
                icon={item.icon}
                isActive={isActive}
              />
            );
          })}
        </div>
        <div className=" py-5 space-y-20 min-w-[220px] md:min-w-full">
          <div>
            {setShowUsageModal ? (
              <div className=" space-y-2 xl:hidden">
                <span className=" bg-black/50 h-[2px] w-full inline-block rounded-lg"></span>
                <div
                  onClick={() =>
                    setShowUsageModal({
                      open: !ShowUsageModal?.open!,
                      modal: "storage",
                    })
                  }
                  className=" w-full h-10 flex items-center justify-center rounded-xl bg-blue-100 cursor-pointer"
                >
                  <div className="w-6 h-6 text-primary-color">
                    <CloudIcon />
                  </div>
                </div>
                <div className=" w-full h-10 flex items-center justify-center rounded-xl bg-green-100 cursor-pointer">
                  <div
                    onClick={() =>
                      setShowUsageModal({
                        open: !ShowUsageModal?.open!,
                        modal: "credits",
                      })
                    }
                    className="w-6 h-6 text-green-500"
                  >
                    <Activity01Icon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-col space-y-5 justify-center h-full">
                <StorageUsage />
                <CreditstUsage />
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className=" xl:hidden bg-danger-500 text-slate-100 w-full rounded-lg p-1 flex items-center justify-center cursor-pointer gap-5"
          >
            {loading ? (
              <Loading03Icon className="w-6 h-6 animate-spin text-white" />
            ) : (
              <>
                <span className=" sm:hidden">Log Out</span>
                <Logout01Icon className="w-6 h-6 rotate-180 " />
              </>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

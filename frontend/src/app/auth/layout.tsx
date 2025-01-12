import Discover from "@/components/signup/discover";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Orgafile %",
  description: "Signup page",
  keywords: "Signup, Signup page",
  robots: "follow, index",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-[100vh] w-[100vw] flex items-center bg-gray-50 justify-center ">
      <div className=" items-center h-[80vh]  shadow-sm bg-white flex max-w-[1200px] rounded-lg md:p-4">
        <Discover />
        {children}
      </div>
    </div>
  );
};

export default Layout;

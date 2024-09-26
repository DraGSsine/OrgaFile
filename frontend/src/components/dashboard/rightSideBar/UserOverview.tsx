"use client";
import React from "react";
import Cookies from "js-cookie";
import UserProfile from "../UserProfile";
import { useRouter } from "next/navigation";
import { userCookieInfoType } from "@/types/types";

const UserOverview = () => {
  const userData = Cookies.get("userInfo");
  const router = useRouter();
  let userInfo: userCookieInfoType | null = null;
  if (!userData) {
    Cookies.remove("token");
    router.push("/auth/signin");
  } else {
    userInfo = JSON.parse(userData);
  }
  return (
    <>
      <div className=" flex flex-col">
        <span className=" font-semibold">{userInfo?.fullName}</span>
        <span className=" text-primary">@{userInfo?.email?.split("@")[0]}</span>
      </div>
      <UserProfile email={userInfo?.email || ""} />
    </>
  );
};

export default UserOverview;

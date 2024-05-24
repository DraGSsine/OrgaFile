"use client";
import React from "react";
import Cookies from "js-cookie";
import UserProfile from "../UserProfile";
const UserOverview = () => {
  interface userInfoType {
    fullName?: string | null;
    email: string | null;
  }
  const userData = Cookies.get("userInfo");
  let userInfo: userInfoType | null = null;
  if (!userData) {
    Cookies.remove("token");
    window.location.href = "/auth/signin";
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

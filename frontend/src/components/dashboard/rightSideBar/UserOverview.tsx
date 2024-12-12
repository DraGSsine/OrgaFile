"use client";

import React, { useState, useEffect } from "react";
import UserProfile from "../UserProfile";
import { useRouter } from "next/navigation";
import { userCookieInfoType } from "@/types/types";

const UserOverview = () => {
  const [userInfo, setUserInfo] = useState<userCookieInfoType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      setUserInfo(JSON.parse(userData));
    } else {
      router.push("/auth/signin");
    }
  }, [router]);

  return (
    <>
      {userInfo ? (
        <div className="flex flex-col">
          <span className="font-semibold text-lg capitalize">{userInfo.fullName}</span>
          <span className="text-primary font-bold">{userInfo.plan || "Basic"}</span>
        </div>
      ) : (
        <InfoSkeleton />
      )}
      <UserProfile email={userInfo?.email || ""} />
    </>
  );
};

export default UserOverview;

const InfoSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="h-4 bg-gray-200 w-40 rounded-md mb-2"></div>
      <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
    </div>
  );
};

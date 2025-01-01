"use client";

import React, { useState, useEffect } from "react";
import UserProfile from "../UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserOverview = () => {
  const { userInfoLoading,userInformation } = useSelector((state: RootState) => state.auth);
  if (!userInformation) return null;
  const { fullName, email, plan } = userInformation;
  return (
    <>
      { userInfoLoading ? (
        <InfoSkeleton />
      ) : (
        <div className="flex flex-col">
          <span className="font-semibold text-lg capitalize">Plan</span>
          <span className="text-primary font-bold">{plan}</span>
        </div>
      )}
      <UserProfile email={email} />
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

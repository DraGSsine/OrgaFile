"use client"
import React from "react";
import UserProfile from "../UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CrownIcon } from "hugeicons-react";

const UserOverview = () => {
  const { userInfoLoading, userInformation } = useSelector((state: RootState) => state.auth);
  
  if (!userInformation) return null;
  const { fullName, email, plan } = userInformation;
  const getPlanClassName = (plan: string) => {
    switch (plan) {
      case 'Standard':
        return 'text-primary-color';
      case 'Basic':
        return 'text-gray-500';
      case 'Gold':
        return 'text-amber-500';
      default:
        return '';
    }
  };
  
  <CrownIcon className={`w-4 h-4 ${getPlanClassName(plan)}`} />
  return (
    <div className="flex items-center h-full px-4 gap-4">
      <div className="flex-1 min-w-0">
        {userInfoLoading ? (
          <InfoSkeleton />
        ) : (
          <div className="space-y-1.5">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
              {fullName}
            </h3>
            <div className="flex items-center gap-2">
              <CrownIcon className={`w-4 h-4 ${getPlanClassName(plan)}`} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {plan}
              </span>
            </div>
          </div>
        )}
      </div>
      <UserProfile email={email} />
    </div>
  );
};

export default UserOverview;

const InfoSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-32 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-24 animate-pulse" />
    </div>
  );
};
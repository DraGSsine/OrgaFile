"use client"
import React, { useEffect } from "react";
import { CloudStorage, UserLimitCard } from "./UsageCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";

const Usage = () => {
    const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    requestUsed,
    storageUsed,
    storageLimit,
    requestLimit,
  } = useSelector((state: RootState) => state.dashboard.userLimits);

  useEffect(() => {
    dispatch(loadUserLimits());
  },[])
  return (
    <>
      <CloudStorage storageLimit={storageLimit} storageUsed={storageUsed}  />
      <UserLimitCard requestUsed={requestUsed} requestLimit={requestLimit}  />
    </>
  );
};

export default Usage;

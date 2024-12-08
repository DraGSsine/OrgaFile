"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { StorageCard, UsageCard } from "./UsageCard";

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
  const { isFileUploaded } = useSelector(
    (state: RootState) => state.files.uploadFileState
  );
  const { isFileDeleted } = useSelector(
    (state: RootState) => state.files.removeFileState
  );
  useEffect(() => {
    dispatch(loadUserLimits());
  }, [isFileUploaded, isFileDeleted, dispatch]);

  return (
    <>
      <StorageCard
        isLoading={loading}
        storageLimit={storageLimit}
        storageUsed={storageUsed}
      />
      <UsageCard
        isLoading={loading}
        requestUsed={requestUsed}
        requestLimit={requestLimit}
      />
    </>
  );
};

export default Usage;

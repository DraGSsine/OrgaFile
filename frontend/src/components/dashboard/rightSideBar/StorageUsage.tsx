"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { resetFilesPermanentlyDeleted } from "@/redux/slices/filesSlices";
import { UsageCard } from "./CreditstUsage";
import { CloudIcon } from "hugeicons-react";
import { formatFileSize } from "@/helpers/helpers";

export function StorageUsage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  
  const { storageUsed, storageLimit } = useSelector(
    (state: RootState) => state.dashboard.userLimits
  );
  
  const { isFileUploaded } = useSelector(
    (state: RootState) => state.files.uploadFileState
  );
  
  const { filesRemovedPermanently } = useSelector(
    (state: RootState) => state.files.removeFileState
  );

  useEffect(() => {
    dispatch(loadUserLimits()).then(() => {
      dispatch(resetFilesPermanentlyDeleted());
      setLoading(false);
    });
  }, [filesRemovedPermanently, isFileUploaded, dispatch]);

  return (
    <UsageCard
      title="Cloud Storage"
      value={storageUsed /100000000 } // bytes Convert to GB
      max={storageLimit}
      label={`${formatFileSize(storageUsed)} of ${storageLimit} GB`}
      progressColor="hsl(201 100% 47%)"
      icon={<CloudIcon />}
      iconColor="text-primary-color"
      iconBgColor="bg-primary-100/50 dark:bg-primary-900/20"
      isLoading={loading}
    />
  );
}
"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { resetFilesPermanentlyDeleted } from "@/redux/slices/filesSlices";
import { UsageCard } from "./CreditstUsage";
import { formatFileSize } from "@/lib/helpers";
import { HardDriveIcon } from "hugeicons-react";

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
      title="Storage Usage"
      value={storageUsed / 100000000}
      max={storageLimit}
      label={`${formatFileSize(storageUsed)} of ${storageLimit} GB`}
      progressColor="primary"
      icon={<HardDriveIcon className="w-5 h-5" />}
      iconColor="text-blue-500"
      iconBgColor="bg-blue-100 border-primary-color dark:bg-blue-900/20"
      isLoading={loading}
    />
  );
}
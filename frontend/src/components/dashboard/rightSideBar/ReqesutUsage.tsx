"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { Activity01Icon } from "hugeicons-react";
import { UsageCard } from "./CreditstUsage";

export function CreditstUsage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  const { creditsUsed, creditsLimit } = useSelector(
    (state: RootState) => state.dashboard.userLimits
  );

  const { isFileUploaded } = useSelector(
    (state: RootState) => state.files.uploadFileState
  );

  useEffect(() => {
    dispatch(loadUserLimits()).then(() => {
      setLoading(false);
    });
  }, [isFileUploaded, dispatch]);

  return (
    <UsageCard
      title="Credits Usage"
      value={creditsUsed}
      max={creditsLimit}
      label={`${creditsUsed} of ${creditsLimit} credits`}
      progressColor="hsl(117 100% 42%)"
      icon={<Activity01Icon />}
      iconColor="text-success-500"
      iconBgColor="bg-success-100/50 dark:bg-success-900/20"
      isLoading={loading}
    />
  );
}

"use client";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardBody, Progress, Skeleton } from "@nextui-org/react";
import { CloudIcon, LimitationIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StorageProgress } from "./StorageProgress";
import { resetFilesPermanentlyDeleted } from "@/redux/slices/filesSlices";

export function StorageUsage({}) {
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
    dispatch(loadUserLimits()).then((res) => {
      dispatch(resetFilesPermanentlyDeleted());
      setLoading(false);
    });
  }, [filesRemovedPermanently, isFileUploaded]);

  return (
    <Card
      className="w-full h-52"
    >
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-primary-100/50 dark:bg-primary-900/20 w-fit p-3 rounded-lg">
            <CloudIcon className="w-7 h-7 text-primary-500" />
          </div>
          <h2 className="font-semibold text-sm 2xl:text-xl mt-4">
            Cloud Storage
          </h2>
        </div>
        <StorageProgress
          isLoading={loading}
          value={storageUsed}
          max={storageLimit}
          label={`${storageUsed.toPrecision(1)} GB of ${storageLimit} GB`}
          color="primary"
        />
      </CardBody>
    </Card>
  );
}

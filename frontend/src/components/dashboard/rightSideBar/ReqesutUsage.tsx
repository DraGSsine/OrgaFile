"use client";
import { loadUserLimits } from "@/redux/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardBody, Progress, Skeleton } from "@nextui-org/react";
import { CloudIcon, LimitationIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StorageProgress } from "./StorageProgress";

export function RequestUsage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { requestUsed, requestLimit } = useSelector(
    (state: RootState) => state.dashboard.userLimits
  );
  const { isFileUploaded } = useSelector(
    (state: RootState) => state.files.uploadFileState
  );
  useEffect(() => {
    dispatch(loadUserLimits()).then((res) => {
      setLoading(false);
    });
  }, [isFileUploaded]);

  return (
    <Card
      className="w-full h-52"
    >
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-success-100/50 dark:bg-success-900/20 w-fit p-3 rounded-lg">
            <LimitationIcon className="w-7 h-7 text-success-500" />
          </div>
          <h2 className="font-semibold text-sm 2xl:text-xl mt-4">
            Monthly Usage
          </h2>
        </div>
        <StorageProgress
          isLoading={loading}
          value={requestUsed}
          max={requestLimit}
          label={`${requestUsed} of ${requestLimit} requests`}
          color="success"
        />
      </CardBody>
    </Card>
  );
}

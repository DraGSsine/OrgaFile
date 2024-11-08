import React from "react";
import { Card, CardBody, Progress } from "@nextui-org/react";
import { Cloudy, Server } from "lucide-react";
export const CloudStorage = ({
  isLoading,
  storageLimit,
  storageUsed,
}: {
  isLoading: boolean;
  storageLimit: number;
  storageUsed: number;
}) => {
  return (
    <Card className="rounded-2xl w-full h-52 flex flex-col bg-gray-50 transition-all">
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-primary-100 w-fit p-3 rounded-2xl">
            <Cloudy color="#0070F0" size={30} />
          </div>
          <h2 className="font-medium py-4 text-xl">Cloud Storage</h2>
        </div>
        {
          isLoading ? (
            <ProgressSkeleton />
          ) : (
            <Progress
              showValueLabel={true}
              value={storageUsed}
              label={`${
                storageUsed.toString().split(".")[0]
              }Gb of ${storageLimit}Gb`}
              maxValue={storageLimit}
              size="md"
              classNames={{
                base: "max-w-md",
                track: "bg-primary-200",
                indicator: "bg-gradient-to-r from-primary-600 to-primary-400",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
            />
          )
        }
      </CardBody>
    </Card>
  );
};
export const UserLimitCard = ({
  isLoading,
  requestUsed,
  requestLimit,
}: {
  isLoading: boolean;
  requestUsed: number;
  requestLimit: number;
}) => {
  return (
    <Card className="rounded-2xl w-full h-52 flex flex-col bg-gray-50 transition-all">
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-green-100 w-fit p-3 rounded-2xl">
            <Server color="#18C964" size={30} />
          </div>
          <h2 className=" font-medium py-4 text-md 2xl:text-xl">Monthly Usage</h2>
        </div>
        {isLoading ? (
        <ProgressSkeleton />
        ) : (
          <Progress
            showValueLabel={true}
            value={requestUsed}
            label={`${requestUsed} of ${requestLimit}`}
            maxValue={requestLimit}
            size="md"
            classNames={{
              base: "max-w-md",
              track: "bg-green-200",
              indicator: "bg-gradient-to-r from-green-600 to-green-400",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};


const ProgressSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2 ">
      <div className=" w-full flex justify-between" >
        <span className=" rounded-full inline-block w-24 h-4 bg-gray-200 " ></span>
        <span className=" rounded-full inline-block w-10 h-4 bg-gray-200 " ></span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-2xl"></div>
    </div>
  );
}
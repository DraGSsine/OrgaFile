"use client";
import { getFileImage } from "@/helpers/helpers";
import { loadClouInfo } from "@/redux/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardBody, Progress, Skeleton } from "@nextui-org/react";
import { File02Icon } from "hugeicons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getColorBaseOnFormat = (format: string) => {
  switch (format) {
    case "pdf":
      return {
        barColor: "bg-red-400",
        backGroundColor: "bg-red-100",
      };
    case "docx":
      return {
        barColor: "bg-primary-color",
        backGroundColor: "bg-primary-100",
      };
    case "txt":
      return {
        barColor: "bg-gray-500",
        backGroundColor: "bg-gray-200",
      };
    case "xlsx":
      return {
        barColor: "bg-green-400",
        backGroundColor: "bg-green-100",
      };
    default:
      return {
        barColor: "bg-gray-500",
        backGroundColor: "bg-gray-200",
      };
  }
};
const Mycloud = () => {
  const { data, error } = useSelector(
    (state: RootState) => state.dashboard.cloudInfo
  );
  const { filesFormatInfo, storage, storageUsed } = data;
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(loadClouInfo());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">My Cloud</h1>
      {loading ? (
        <CoudSkeleton />
      ) : (
        <div className="grid grid-cols-2 fade-in  2xl:grid-cols-4 min-h-[14.1vh] gap-8 fade-in">
          {filesFormatInfo.map((item) => (
            <Cloud
              key={item.name}
              name={item.name}
              filesNum={item.numberOfFiles}
              used={item.size}
              backGroundColor={getColorBaseOnFormat(item.name).backGroundColor}
              barColor={getColorBaseOnFormat(item.name).barColor}
              maxStorage={storage}
              icon={getFileImage(item.name.toLowerCase())}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mycloud;

const Cloud = ({
  name,
  filesNum,
  used,
  maxStorage,
  backGroundColor,
  barColor,
  icon,
}: {
  name: string;
  filesNum: number;
  used: number;
  maxStorage: number;
  backGroundColor: string;
  barColor: string;
  icon: string;
}) => {
  return (
    <Card className="rounded-lg w-full h-48 flex flex-col transition-all select-none ">
      <CardBody className="p-6 flex flex-col justify-between">
        <div className="flex items-center">
          <div
            className={`${backGroundColor} w-fit p-3 rounded-lg flex items-center justify-center`}
          >
            <Image src={icon} width={40} height={40} alt={name} />
          </div>
          <div className="flex-grow pl-7">
            <h1 className=" text-lg">{name}</h1>
            <p className="text-gray-400 font-light text-sm ">
              {filesNum} Files
            </p>
          </div>
        </div>

        <div className=" space-y-5">
          <Progress
            color="default"
            classNames={{
              base: "max-w-md",
              track: `${backGroundColor} rounded-lg`,
              indicator: `${barColor} rounded-lg`,
            }}
            size="sm"
            value={used}
            maxValue={maxStorage}
          />
          <div className=" flex justify-between font-medium text-gray-600 ">
            <span>{used}Gb</span>
            <span>{maxStorage}Gb</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const CoudSkeleton = () => {
  return (
    <div className="grid grid-cols-2 fade-in  2xl:grid-cols-4 min-h-[14.1vh] gap-8">
      {[1, 2, 3, 4].map((item) => (
        <Card
          key={item}
          className="rounded-lg w-full h-48 flex flex-col bg-gray-50 transition-all select-none "
        >
          <CardBody className="p-6 flex flex-col justify-between">
            <div className="flex items-center">
              <div
                className={`bg-gray-200 p-3 rounded-lg flex items-center justify-center w-[64px] h-[64px]`}
              ></div>
              <div className="flex-grow pl-7 space-y-4">
                <Skeleton className="h-3 w-10 rounded-lg"></Skeleton>
                <Skeleton className="h-3 rounded-lg w-10 "></Skeleton>
              </div>
            </div>

            <div className=" space-y-5">
              <Skeleton className=" h-8 w-full rounded-lg "></Skeleton>
              <div className=" flex justify-between font-medium text-gray-600 ">
                <Skeleton className=" w-20 h-5  inline-block rounded-lg "></Skeleton>
                <Skeleton className=" w-20 h-5  inline-block rounded-lg "></Skeleton>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

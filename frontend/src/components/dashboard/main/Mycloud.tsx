"use client";
import { getFileImage } from "@/helpers/helpers";
import { loadClouInfo } from "@/redux/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardBody, Progress } from "@nextui-org/react";
import Image from "next/image";
import { useEffect } from "react";
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
        barColor: "bg-primary-400",
        backGroundColor: "bg-primary-100",
      };
    case "txt":
      return {
        barColor: "bg-gray-500",
        backGroundColor: "bg-gray-200",
      };
    case "rtf":
      return {
        barColor: "bg-purple-400",
        backGroundColor: "bg-purple-100",
      };
    default:
      return {
        barColor: "bg-gray-500",
        backGroundColor: "bg-gray-200",
      };
  }
};
const Mycloud = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dashboard.cloudInfo
  );
  const { filesFormatInfo, storage, storageUsed } = data;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadClouInfo());
  }, []);
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">My Cloud</h1>
      {loading ? (
        <CoudSkeleton />
      ) : (
        <div className="grid grid-cols-2  2xl:grid-cols-4 min-h-[14.1vh] gap-8">
          {filesFormatInfo.map((item) => (
            <Cloud
              key={item.name}
              name={item.name}
              filesNum={item.numberOfFiles}
              used={+(item.size / 1024 / 1024 / 1024).toString().slice(0, 3)}
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
    <Card className="rounded-2xl w-full h-48 flex flex-col bg-gray-50 transition-all select-none ">
      <CardBody className="p-6 flex flex-col justify-between">
        <div className="flex items-center">
          <div
            className={`${backGroundColor} w-fit p-3 rounded-2xl flex items-center justify-center`}
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
              track: `${backGroundColor} rounded-2xl`,
              indicator: `${barColor} rounded-2xl`,
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
    <div>
      <div className="grid grid-cols-2  2xl:grid-cols-4 min-h-[14.1vh] gap-8">
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            className="rounded-2xl w-full h-48 flex flex-col bg-gray-50 transition-all select-none "
          >
            <CardBody className="p-6 flex flex-col justify-between">
              <div className="flex items-center">
                <div
                  className={`bg-gray-200 w-fit p-3 rounded-2xl flex items-center justify-center`}
                >
                  <Image
                    src="/images/icons/pdf.svg"
                    width={40}
                    height={40}
                    alt="pdf"
                  />
                </div>
                <div className="flex-grow pl-7">
                  <h1 className=" text-lg">PDF</h1>
                  <p className="text-gray-400 font-light text-sm ">10 Files</p>
                </div>
              </div>

              <div className=" space-y-5">
                <Progress
                  color="default"
                  classNames={{
                    base: "max-w-md",
                    track: `bg-gray-200 rounded-2xl`,
                    indicator: `bg-red-400 rounded-2xl`,
                  }}
                  size="sm"
                  value={10}
                  maxValue={100}
                />
                <div className=" flex justify-between font-medium text-gray-600 ">
                  <span>10Gb</span>
                  <span>100Gb</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

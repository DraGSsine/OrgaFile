import { getFileImage } from "@/helpers/helpers";
import { Card, CardBody, Progress } from "@nextui-org/react";
import { FolderArchive, FolderOpen } from "lucide-react";
import Image from "next/image";

const data = [
  {
    barColor: "bg-primary-400",
    backGroundColor: "bg-primary-100",
    name: "Images",
    filesNum: 120,
    used: 30,
    maxStorage: 100,
  },
  {
    barColor: "bg-primary-400",
    backGroundColor: "bg-primary-100",
    name: "Documents",
    filesNum: 120,
    used: 30,
    maxStorage: 100,
  },
  {
    barColor: "bg-primary-400",
    backGroundColor: "bg-primary-100",
    name: "Text Files",
    filesNum: 120,
    used: 30,
    maxStorage: 100,
  },
  {
    barColor: "bg-primary-400",
    backGroundColor: "bg-primary-100",
    name: "Other Files",
    filesNum: 120,
    used: 30,
    maxStorage: 100,
  },
];

const Mycloud = () => {
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">My Cloud</h1>
      <div className="grid grid-cols-2  2xl:grid-cols-4 gap-8">
        {data.map((item) => (
          <Cloud
            key={item.name}
            name={item.name}
            filesNum={item.filesNum}
            used={item.used}
            backGroundColor={item.backGroundColor}
            barColor={item.barColor}
            maxStorage={item.maxStorage}
          />
        ))}
      </div>
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
}: {
  name: string;
  filesNum: number;
  used: number;
  maxStorage: number;
  backGroundColor: string;
  barColor: string;
}) => {
  return (
    <Card className="rounded-2xl w-full h-48 flex flex-col bg-gray-50 transition-all select-none ">
      <CardBody className="p-6 flex flex-col justify-between">
        <div className="flex items-center">
          <div className={`${backGroundColor} w-fit p-3 rounded-2xl flex items-center justify-center`}>
            <FolderOpen size={30} fill="#0070F0" stroke="#0070F0" />
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
            value={30}
          />
          <div className=" flex justify-between font-medium text-gray-600 ">
            <span>{used}GB</span>
            <span>{maxStorage}GB</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

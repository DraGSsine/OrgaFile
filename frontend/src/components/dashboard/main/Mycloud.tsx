import { Progress } from "@nextui-org/react";
import { EllipsisVertical, Image } from "lucide-react";
import React, { use } from "react";

const data = [
  {
    name: "Images",
    filesNum: 120,
    used: 30,
  },
  {
    name: "Documents",
    filesNum: 120,
    used: 30,
  },
  {
    name: "Videos",
    filesNum: 120,
    used: 30,
  },
  {
    name: "",
    filesNum: 120,
    used: 30,
  },
  {
    name: "",
    filesNum: 120,
    used: 30,
  },
];

const Mycloud = () => {
  return (
    <div>
      <h1 className=" font-medium text-2xl ">My Cloud</h1>
      <div className="grid grid-cols-3 gap-8 3xl:grid-cols-4 ">
        {data.map((item) => (
          <Cloud name={item.name} filesNum={item.filesNum} used={item.used} />
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
}: {
  name: string;
  filesNum: number;
  used: number;
}) => {
  return (
    <div className="w-[100%] rounded-2xl p-4 bg-gray-50 space-y-6 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg ">
      <div className="flex items-center">
        <div className="p-3 rounded-xl bg-[#ff858520]">
          <Image color="#ff8585" size={40} strokeWidth={1} />
        </div>
        <div className="flex-grow pl-7">
          <h1 className="font-semibold text-lg">{name}</h1>
          <p className="text-gray-500">{filesNum} Files</p>
        </div>
        <EllipsisVertical className="ml-auto" color="gray" size={20} />
      </div>

      <div className=" space-y-5">
        <Progress size="sm"  value={30} color="danger" />
        <div className="flex gap-2">
          <p>{used} GB of 100 GB</p>
        </div>
      </div>
    </div>
  );
};

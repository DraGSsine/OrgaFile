import { Button, Card, CardBody, Progress } from "@nextui-org/react";
import { EllipsisVertical, File, FileText, Image, Video } from "lucide-react";
import { ReactNode } from "react";

const data = [
  {
    barColor: "bg-red-400",
    backGroundColor: "bg-red-100",
    icon: <Image color="#ff8585" size={35} strokeWidth={1} />,
    name: "Images",
    filesNum: 120,
    used: 30,
  },
  {
    barColor: "bg-orange-400",
    backGroundColor: "bg-orange-100",
    icon: <FileText color="#ffa31a" size={35} strokeWidth={1} />,
    name: "Documents",
    filesNum: 120,
    used: 30,
  },
  {
    barColor: "bg-purple-400",
    backGroundColor: "bg-purple-100",
    icon: <Video color="#cc00cc" size={35} strokeWidth={1} />,
    name: "Videos",
    filesNum: 120,
    used: 30,
  },
];

const Mycloud = () => {
  return (
    <div>
      <h1 className=" font-medium text-2xl pb-6 ">My Cloud</h1>
      <div className="grid grid-cols-3 gap-8">
        {data.map((item) => (
          <Cloud
            key={item.name}
            name={item.name}
            filesNum={item.filesNum}
            used={item.used}
            icon={item.icon}
            backGroundColor={item.backGroundColor}
            barColor={item.barColor}
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
  icon,
  backGroundColor,
  barColor,
}: {
  name: string;
  filesNum: number;
  used: number;
  icon: ReactNode;
  backGroundColor: string;
  barColor: string;
}) => {
  return (
    <div className=" bg-white p-4 rounded-2xl shadow-sm space-y-6 mb-8">
      <div className="flex items-center">
        <div className={`p-2 rounded-xl ${backGroundColor} `}>{icon}</div>
        <div className="flex-grow pl-7">
          <h1 className=" text-lg">{name}</h1>
          <p className="text-gray-400 font-light text-sm ">{filesNum} Files</p>
        </div>
        <Button
          isIconOnly
          variant="flat"
          disableRipple
          className="ml-auto bg-transparent border-none hover:bg-transparent "
        >
          <EllipsisVertical color="gray" size={20} />
        </Button>
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
        <div className=" text-gray-600 ">
          <p>{used} GB of 100 GB</p>
        </div>
      </div>
    </div>
  );
};

import { CircularProgress, Card, CardBody, Progress } from "@nextui-org/react";
import UserProfile from "./UserProfile";
import { Cloudy, Server } from "lucide-react";



export const RightSideBar = () => {
  return (
    <div className="w-[15vw] border-l">
      <div className=" px-8 items-center flex h-[8vh] border-b justify-between ">
        <div className=" flex flex-col">
          <span className=" font-semibold">Yassine ouchen</span>
          <span className=" text-primary">@Youchen</span>
        </div>
        <UserProfile />
      </div>
      <div className="py-10 px-4">
        <div className="flex justify-between items-center 3xl:justify-around flex-col gap-8 ">
          <CloudStorage />
          <UserLimitCard />
        </div>
      </div>
    </div>
  );
};
const CloudStorage = () => {
  return (
    <Card className="rounded-2xl w-full h-52 flex flex-col bg-gray-50 transition-all">
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-primary-100 w-fit p-3 rounded-2xl">
            <Cloudy color="#0070F0" size={30} />
          </div>
          <h2 className="font-medium py-4 text-xl">Cloud Storage Usage</h2>
        </div>
        <Progress
          showValueLabel={true}
          value={50}
          label="3Gb of 10Gb"
          maxValue={100}
          size="md"
          classNames={{
            base: "max-w-md",
            track: "bg-primary-200",
            indicator: "bg-gradient-to-r from-primary-600 to-primary-400",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
        />
      </CardBody>
    </Card>
  );
};
const UserLimitCard = () => {
  return (
    <Card className="rounded-2xl w-full h-52 flex flex-col bg-gray-50 transition-all">
      <CardBody className="p-6 flex flex-col justify-between">
        <div>
          <div className="bg-green-100 w-fit p-3 rounded-2xl">
            <Server color="#18C964" size={30} />
          </div>
          <h2 className=" font-medium py-4 text-md 2xl:text-xl">Daily Usage Limit</h2>
        </div>
        <Progress
          showValueLabel={true}
          value={50}
          label="1 of 2"
          maxValue={100}
          size="md"
          classNames={{
            base: "max-w-md",
            track: "bg-green-200",
            indicator: "bg-gradient-to-r from-green-600 to-green-400",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
        />
      </CardBody>
    </Card>
  );
};
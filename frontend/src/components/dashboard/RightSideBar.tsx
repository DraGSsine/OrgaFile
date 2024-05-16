import { CircularProgress, Card, CardBody } from "@nextui-org/react";
import UserProfile from "./UserProfile";

export const RightSideBar = () => {
  return (
    <div className="min-w-[25vw] border-l">
      <div className=" pl-5 items-center flex h-[10vh] border-b justify-between ">
        <div className=" flex flex-col">
          <span className=" font-semibold">Yassine ouchen</span>
          <span className=" text-primary">@Youchen</span>
        </div>
        <UserProfile />
      </div>
      <div className="py-10 px-4">
        <div className="flex justify-between ">
          <CircularChart />
          <CircularChart />
        </div>
      </div>
    </div>
  );
};

export default function CircularChart() {
  return (
    <Card className="rounded-2xl w-52 h-60 p-2 flex flex-col bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-l">
      <CardBody className="justify-center items-center py-0">
        <h2 className=" font-semibold text-center pb-4 text-xl ">
          Request Limit
        </h2>

        <CircularProgress
          classNames={{
            svg: "w-36 h-36",
            indicator: "stroke-green-500",
            track: "stroke-green-100",
            value: "text-2xl font-semibold text-gray-800",
          }}
          valueLabel="1 of 10"
          value={70}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
}

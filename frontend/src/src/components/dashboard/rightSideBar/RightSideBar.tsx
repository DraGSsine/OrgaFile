import { RequestUsage } from "./ReqesutUsage";
import { StorageUsage } from "./StorageUsage";
import UserOverview from "./UserOverview";

export const RightSideBar = () => {
  return (
    <div className=" hidden xl:inline-block col-start-15 col-end-17 border-l">
      <div className=" px-8 items-center flex h-[8vh] border-b justify-between ">
        <UserOverview />
      </div>
      <div className="py-10 px-4">
        <div className="flex justify-between items-center 3xl:justify-around flex-col gap-8 ">
            <StorageUsage/>
            <RequestUsage/>
        </div>
      </div>
    </div>
  );
};

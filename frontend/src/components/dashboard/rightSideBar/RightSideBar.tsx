import UserProfile from "../UserProfile";
import Usage from "./Usage";
import UserOverview from "./UserOverview";

export const RightSideBar = () => {
  return (
    <div className=" col-start-11 col-end-13 border-l">
      <div className=" px-8 items-center flex h-[8vh] border-b justify-between ">
        <UserOverview />
      </div>
      <div className="py-10 px-4">
        <div className="flex justify-between items-center 3xl:justify-around flex-col gap-8 ">
            <Usage />
        </div>
      </div>
    </div>
  );
};

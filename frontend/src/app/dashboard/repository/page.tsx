import LoadFolders from "@/components/dashboard/repository/LoadFolders";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className=" font-medium  text-2xl pl-2 pb-6 ">Repository</h1>
      <div className="h-[84.3vh] bg-white relative rounded-t-lg p-10  shadow-small">
          <LoadFolders />
      </div>
    </div>
  );
};

export default Page;

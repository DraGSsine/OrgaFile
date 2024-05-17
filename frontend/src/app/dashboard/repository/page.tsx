import LoadFolders from "@/components/dashboard/repository/LoadFolders";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <h1 className=" font-medium  text-2xl pl-2 pb-6 ">Repository</h1>
      <div className=" min-h-[84.2vh] max-w-[67vw] bg-white relative rounded-t-2xl p-10  shadow-small">
          <LoadFolders />
      </div>
    </div>
  );
};

export default Page;

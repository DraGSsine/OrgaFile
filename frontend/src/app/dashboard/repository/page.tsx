import { HeaderPage } from "@/components/dashboard/HeaderPage";
import LoadFolder from "@/components/dashboard/repository/LoadFolders";
import { Folder01Icon } from "hugeicons-react";
import React from "react";

const Page = () => {
  return (
    <div className=" h-full pt-5 grid grid-rows-12 ">
      <HeaderPage icon={<Folder01Icon className=" h-8 w-8 text-primary-500" />} title="Repository" description="Discover All your organized folders" />
      <div className=" row-start-2 row-end-17 flex-grow bg-white relative rounded-t-lg p-10  shadow-small">
        <LoadFolder />
      </div>
    </div>
  );
};

export default Page;

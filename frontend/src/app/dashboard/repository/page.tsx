import { HeaderPage } from "@/components/dashboard/HeaderPage";
import LoadFolder from "@/components/dashboard/repository/LoadFolders";
import { Folder01Icon} from "hugeicons-react";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col pt-5 h-full">
      <HeaderPage icon={<Folder01Icon className=" h-8 w-8 text-primary-500"/>} title="Repository" description="Discover All your organized folders" />
      <div className=" flex-grow bg-white relative rounded-t-lg p-10  shadow-small">
          <LoadFolder />
      </div>
    </div>
  );
};

export default Page;

import { HeaderPage } from "@/components/dashboard/HeaderPage";
import ManageBilling from "@/components/dashboard/settings/ManageBilling";
import { Settings02Icon } from "hugeicons-react";
import React from "react";

const Page = () => {
  return (
    <div className=" h-full flex flex-col pt-5">
      <HeaderPage
        icon={<Settings02Icon className=" h-8 w-8 text-primary-500 " />}
        title="All Files"
        description="Discover All Your upladed files "
      />
      <div className=" flex-grow w-full bg-white relative rounded-t-lg p-10  shadow-small">
        <ManageBilling />
      </div>
    </div>
  );
};

export default Page;

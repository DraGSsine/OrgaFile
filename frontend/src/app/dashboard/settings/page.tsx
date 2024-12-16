"use client";

import { Settings02Icon } from "hugeicons-react";
import { HeaderPage } from "@/components/dashboard/HeaderPage";
import { SettingsTabs } from "@/components/dashboard/settings/SettingsTabs";



export default function SettingsPage() {
  return (

    <div className=" h-full pt-5 grid grid-rows-12 ">
      <HeaderPage
        icon={<Settings02Icon className="h-8 w-8 text-primary" />}
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <div className="row-start-2 row-end-17 flex-grow relative rounded-t-lg shadow-small">
        <SettingsTabs />
      </div>
    </div>
  );
}
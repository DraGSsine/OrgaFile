"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { BillingSettings } from "./billing/BillingSettings";
import { ProfileSettings } from "./profile/ProfileSettings";

export function SettingsTabs() {
  return (

    <Tabs
      aria-label="Settings"
      color="primary"
      variant="underlined"
      classNames={{
        wrapper: "py-0",
      }}
    >
      <Tab key="billing" title="Billing" className=" h-[94%] pt-4">
        <BillingSettings />
      </Tab>
      <Tab key="profile" title="Profile" className=" h-[94%] pt-4  ">
        <ProfileSettings />
      </Tab>
    </Tabs>

  );
}
"use client";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm";
import { ProfileDelete, SecuritySettings } from "./SecuritySettings";

export function ProfileSettings() {
  return (
    <div className="px-2 xl:px-10 space-y-2 pt-2 2xl:gap-5 2xl:py-6 overflow-y-scroll h-full flex flex-col">
      <div className="flex flex-col 2xl:flex-row items-start gap-5">
        <div className=" w-full flex flex-col gap-5" >
          <ProfileForm />
          <SecuritySettings />
        </div>
        <ProfileDelete />
      </div>
    </div>
  );
}
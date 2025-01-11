import { Settings02Icon } from "hugeicons-react";
import { HeaderPage } from "@/components/dashboard/HeaderPage";
import { CurrentPlanCard } from "@/components/dashboard/settings/billing/CurrentPlanCard";
import { PaymentHistoryCard } from "@/components/dashboard/settings/billing/PaymentHistoryCard";
import { SecuritySettings } from "@/components/dashboard/settings/profile/SecuritySettings";
import { ProfileDelete } from "@/components/dashboard/settings/profile/ProfileDelete";


export default function SettingsPage() {
  return (

    <div className=" h-full pt-5 grid grid-rows-12 ">
      <HeaderPage
        icon={<Settings02Icon className="h-8 w-8 text-primary" />}
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <div className=" row-start-2 row-end-17 flex-grow relative rounded-t-lg  flex gap-5 flex-col h-full">
        <div className="lg:max-h-max max-h-[25vh] overflow-y-scroll lg:overflow-hidden px-1 py-4 lg:grid grid-cols-10 gap-10 " >
          <CurrentPlanCard />
          <SecuritySettings />
          <ProfileDelete />
        </div>
        <PaymentHistoryCard />
      </div>
    </div>
  );
}
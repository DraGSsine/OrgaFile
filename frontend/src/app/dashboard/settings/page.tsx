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
      <div className=" row-start-2 row-end-17 flex-grow relative rounded-t-lg shadow-small p-6 flex gap-5 flex-col h-full">
        <div className=" max-h-[23vh] lg:max-h-max space-y-5 lg:space-y-0 overflow-y-scroll lg:grid grid-cols-10 gap-5 lg:p-4 " >
          <CurrentPlanCard />
          <SecuritySettings />
          <ProfileDelete />
        </div>
        <PaymentHistoryCard />
      </div>
    </div>
  );
}
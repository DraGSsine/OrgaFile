"use client";
import { Button } from "@nextui-org/button";
import { Loading03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Ensure useState is imported
import cookies from "js-cookie";
const Upgrade = ({ plan }: { plan: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const upgradePlan = async (plan: string) => {
    setLoading(true);
    setTimeout(() => {
      cookies.set("plan", plan, { expires: 365 });
      router.push(`/auth/signup`);
      setLoading(false);
    }, 1000);
  };

  return (
    <button
      onClick={() => upgradePlan(plan)}
      data-plan={plan}
      className={`w-full h-12 rounded-xl font-medium transition-all duration-200 ${
        plan === "Pro"
          ? "bg-white text-primary-color"
          : "bg-primary-color text-white"
      } flex items-center justify-center gap-2`}
      disabled={loading}
    >
      {loading ? <Loading03Icon className="animate-spin h-5 w-5" /> : "Upgrade"}
    </button>
  );
};

export default Upgrade;

"use client";
import { Button } from "@nextui-org/button";
import { Loading03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState } from 'react'; // Ensure useState is imported
import cookies from 'js-cookie'
const Upgrade = ({
  plan,
  active
}: {
  plan: string;
  active: boolean | undefined;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const upgradePlan = async (plan: string) => {
    setLoading(true);
    setTimeout(() => {
      cookies.set('plan', plan, { expires: 365 });
      router.push(`/auth/signup`);
      setLoading(false);
    } , 1000);
  };

  return (
    <Button
      onClick={() => upgradePlan(plan)}
      size="lg"
      radius="full"
      data-plan={plan}
      className={` ${active
        ? "flex justify-center w-full border border-primary-color bg-primary-color text-base font-medium text-white transition hover:bg-opacity-90"
        : "flex justify-center text-center w-full border border-stroke bg-transparent text-base font-medium text-primary-color transition hover:border-primary-color hover:bg-primary-color hover:text-white dark:border-dark-3"
        } `}
      disabled={loading}
    >
      {loading ? (
        <Loading03Icon className="animate-spin h-5 w-5" />
      ) : (
        "Upgrade"
      )}
    </Button>
  );
};

export default Upgrade;
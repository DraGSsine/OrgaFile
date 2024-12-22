"use client";
import { Button } from "@nextui-org/button";
import { Loading03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState } from 'react'; // Ensure useState is imported
import Cookies from "js-cookie";

const Upgrade = ({
  plan,
  active,
  productId,
}: {
  plan: string;
  active: boolean | undefined;
  productId: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const upgradePlan = (plan: string) => {
    setLoading(true);
    Cookies.set("plan", plan, {
      expires: 1,
      domain: process.env.PROD === 'true' ? '.orgafile.com' : 'localhost',
      sameSite: process.env.PROD === 'true' ? 'none' : 'lax',
      secure: process.env.PROD === 'true' ? true : false,
      httpOnly: true,
    });
    setTimeout(() => {
      router.push("/auth/signup");
      setLoading(false);
    }, 1000);
  };

  return (
    <Button
      onClick={() => upgradePlan(plan)}
      size="lg"
      radius="full"
      data-plan={plan}
      className={` ${active
        ? "flex justify-center w-full border border-primary bg-primary text-base font-medium text-white transition hover:bg-opacity-90"
        : "flex justify-center text-center w-full border border-stroke bg-transparent text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
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
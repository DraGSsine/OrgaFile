"use client";
import { Button } from "@nextui-org/button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";

const Upgrade = ({
  plan,
  active,
}: {
  plan: string;
  active: boolean | undefined;
}) => {
  const router = useRouter();
  const upgradPlan = (plan: string) => {
    Cookies.set("plan", plan, {
      expires: 7 * 24 * 60 * 60,
      sameSite: "strict",
      secure: true,
    });
    let price_id: string = "price_1PIwvSCRq7xCj4sRtnFgoawN"; // basic as default
    if (plan === "Standard") {
      price_id = "price_1PIwwECRq7xCj4sRV1O6QKeK";
    } else if (plan === "Premium") {
      price_id = "price_1PIwwvCRq7xCj4sRxgJYesQ8";
    }
    Cookies.set("price_id", price_id, {
      expires: 7 * 24 * 60 * 60,
      sameSite: "strict",
      secure: true,
    });
    router.push("/auth/signup");
  };
  return (
    <Button
      onClick={() => upgradPlan(plan)}
      size="lg"
      radius="full"
      data-plan={plan}
      className={` ${
        active
          ? "block w-full border border-primary bg-primary  text-center text-base font-medium text-white transition hover:bg-opacity-90"
          : "block w-full border border-stroke bg-transparent  text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
      } `}
    >
      Upgrade to {plan}
    </Button>
  );
};

export default Upgrade;

"use client";
import { Button } from "@nextui-org/button";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";
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
  const upgradPlan = (plan: string) => {
    return new Promise((resolve, reject) => {
      Cookies.set("plan", plan, {
        expires: 60,
      });
  
      if (Cookies.get("plan") === plan) {
        resolve(true);
      } else {
        reject(new Error("Failed to set cookie"));
      }
    })
    .then(() => {
      router.push("/auth/signup");
    })
    .catch((error) => {
      console.error(error);
    });
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

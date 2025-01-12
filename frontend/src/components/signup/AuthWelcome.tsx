"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, cn } from "@nextui-org/react";
import { ArrowRight01Icon, Loading03Icon } from "hugeicons-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { GoogleAuthAction } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import cookies from "js-cookie";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
export const AuthWelcome = ({
  title,
  paragraph,
  authLink,
  authTitle,
}: {
  title: string;
  paragraph: string;
  authLink: string;
  authTitle: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const HandleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const plan = cookies.get("plan");
      if (
        pathname == "auth/signup" &&
        plan !== "Basic" &&
        plan !== "Gold" &&
        plan !== "Standard"
      ) {
        setIsLoading(false);
        router.push("/pricing");
        return toast.info("Please select a plan");
      }
      try {
        const googleAuthResult = await dispatch(
          GoogleAuthAction(tokenResponse.access_token)
        );
        if (GoogleAuthAction.fulfilled.match(googleAuthResult)) {
          const plan = cookies.get("plan") || "Unknown";
          const checkoutResult = await dispatch(createCheckoutSession(plan));
          if (createCheckoutSession.fulfilled.match(checkoutResult)) {
            toast.success("Sign up successful");
            router.push(checkoutResult.payload.url);
            return;
          } else {
            if (checkoutResult.payload === "Select a plan before proceeding") {
              toast.error("Select a plan before proceeding");
              return router.push("/pricing");
            }
            toast.error(
              (googleAuthResult.payload.message as string) || "Sign up failed"
            );
            return;
          }
        }
        toast.error((googleAuthResult.payload as string) || "Sign up failed");
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  }) as any;
  return (
    <>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="space-y-6 mb-12">
        <h1 className="font-bold text-[2.7rem] tracking-tight">{title}</h1>

        <p className="text-muted-foreground text-lg">
          {paragraph}
          <Link
            href={authLink}
            className={cn(
              "text-primary font-medium hover:text-primary/80 transition-colors",
              "inline-flex items-center gap-1 group"
            )}
          >
            {authTitle}
            <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </p>
      </div>

      {/* Auth providers */}
      <div className="grid gap-4 mb-8">
        <Button
          isLoading={isLoading}
          onPress={() => {
            HandleGoogleAuth(), setIsLoading(true);
          }}
          variant="solid"
          className="h-12 bg-black text-white"
        >
          {/* {isLoading ? (
            <Loading03Icon className="w-6 h-6 animate-spin" />
          ) : ( */}
          <>
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </>
          {/* )} */}
        </Button>
      </div>
    </>
  );
};

"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/react";
import { userInfoType } from "@/types/types";
import { ZodIssue, z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignInAction, resetAuthState } from "@/redux/slices/authSlice";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import Cookies from "js-cookie";
export const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, userCreated } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<userInfoType>({
    email: null,
    password: null,
  });
  const [errorState, setErrorState] = useState<ZodIssue | null>(null);
  const User = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedUser = User.safeParse(userInfo);
    if (!parsedUser.success) {
      setErrorState(parsedUser.error.errors[0]);
    } else {
      setErrorState(null);
      dispatch(SignInAction(userInfo));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (isAuthenticated) {
      toast.success("Sign in successful");
      if (userCreated?.isSubscribed) {
        router.push("/dashboard");
      } else {
        dispatch(
          createCheckoutSession({
            price_id:
              Cookies.get("price_id") || "price_1PIwwECRq7xCj4sRV1O6QKeK",
          })
        );
      }
    }
    dispatch(resetAuthState());
  });
  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex gap-6 flex-col">
      <EmailInput
        errorState={errorState}
        onChange={(e) => setUserInfo({ ...userInfo, email: e })}
      />
      <PasswordInput
        errorState={errorState}
        label="Password"
        name="password"
        onChange={(e) => setUserInfo({ ...userInfo, password: e })}
      />
      <Button
        type="submit"
        color="primary"
        className="w-full h-[60px] text-lg"
        isLoading={isLoading ? true : false}
      >
        Sign in
      </Button>
    </form>
  );
};

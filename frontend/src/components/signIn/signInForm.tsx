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
import { useSigninMutation } from "@/redux/slices/userApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

export const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const response = useSelector((state: RootState) => state.auth.userInfo);
  const [signin, { isLoading }] = useSigninMutation();
  const router = useRouter()
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
      try {
        const res = await signin({ ...userInfo }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Welcome back");
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error?.data?.message || "An error occured");
    }}
  };
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
        Create Account
      </Button>
    </form>
  );
};

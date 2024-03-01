"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/react";
import { userInfoType } from "@/types/types";
import { ZodIssue, z } from "zod";
import { login } from "@/redux/slices/loginSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const response = useSelector((state: RootState) => state.login);
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
      await dispatch(login(userInfo));
      if (response.response?.statusCode === 401) {
        toast.error(response.response.message);
      } else if (response.response) {
        toast.success(response.response.message || "Success");
        router.push('/dashboard')
      }
    }
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
        isLoading={response.loading ? true : false}
      >
        Create Account
      </Button>
    </form>
  );
};

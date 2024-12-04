"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Checkbox, Input, RadioGroup } from "@nextui-org/react";
import { userInfoType } from "@/types/types";
import { ZodIssue, z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  SignInAction,
  SignUpAction,
  resetAuthState,
} from "@/redux/slices/authSlice";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";

const SignupPageForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isLoading, userCreated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [isSelected, setIsSelected] = useState(false);
  const [userCredential, setUserInfo] = useState<userInfoType>({
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [errorState, setErrorState] = useState<ZodIssue | null>(null);
  const User = z
    .object({
      fullName: z.string().min(3).max(30),
      email: z.string().email(),
      password: z.string().min(6).max(30),
      confirmPassword: z.string().min(6).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedUser = User.safeParse(userCredential);
    if (!parsedUser.success) {
      setErrorState(parsedUser.error.errors[0]);
    } else {
      setErrorState(null);
      dispatch(SignUpAction(userCredential)).then((action: any) => {
        if (SignUpAction.fulfilled.match(action)) {
          dispatch(createCheckoutSession()).then((action: any) => {
            if (createCheckoutSession.fulfilled.match(action)) {
              toast.success("Account created successfully");
              router.push(action.payload.url);
            } else
            console.log(action.payload);
              toast.error(
                (action.payload.message as string) || "An error occurred"
              );
          });
        } else {
          console.log(action.payload);
          toast.error(
            (action.payload.message as string) || "An error occurred"
          );
        }
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex gap-6 flex-col">
      <Input
        variant="bordered"
        name="fullname"
        label="Full Name"
        onChange={(e) =>
          setUserInfo({ ...userCredential, fullName: e.target.value })
        }
      />
      <EmailInput
        errorState={errorState}
        onChange={(e) => setUserInfo({ ...userCredential, email: e })}
      />
      <PasswordInput
        errorState={errorState}
        label="Password"
        name="password"
        onChange={(e) => setUserInfo({ ...userCredential, password: e })}
      />
      <PasswordInput
        errorState={errorState}
        label="confirme Password"
        name="confirmPassword"
        onChange={(e) => setUserInfo({ ...userCredential, confirmPassword: e })}
      />
      <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
        <span className=" text-[1rem] text-zinc-500 ">
          I acknowledge and agree to the terms and conditions of the website
        </span>
      </Checkbox>
      <Button
        isDisabled={!isSelected}
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

export default SignupPageForm;

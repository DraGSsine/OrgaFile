"use client";
import React, { FormEvent, useEffect, useState } from "react";
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
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [userCredential, setUserCredential] = useState<userInfoType>({
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
    acceptTerms: false,
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
    if (!localStorage.getItem("plan")) {
      toast.error("Please select a plan");
      router.push("/pricing");
      return;
    }

    const parsedUser = User.safeParse(userCredential);
    if (!parsedUser.success) {
      setErrorState(parsedUser.error.errors[0]);
    } else {
      setErrorState(null);
      try {
        const resultAction = await dispatch(SignUpAction(userCredential));
        if (SignUpAction.fulfilled.match(resultAction)) {
          toast.success("Account created successfully");
          const checkoutResultAction = await dispatch(createCheckoutSession());
          if (createCheckoutSession.fulfilled.match(checkoutResultAction)) {
            router.push(checkoutResultAction.payload.url);
          } else {
            toast.error("An error occurred during checkout session creation");
          }
        } else {
          if (resultAction.payload) {
            toast.error(resultAction.payload as string);
          } else {
            toast.error("Sign up failed");
          }
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex gap-6 flex-col">
      <Input
        variant="bordered"
        name="fullname"
        label="Full Name"
        onChange={(e) =>
          setUserCredential({ ...userCredential, fullName: e.target.value })
        }
      />
      <EmailInput
        errorState={errorState}
        onChange={(e) => setUserCredential({ ...userCredential, email: e })}
      />
      <PasswordInput
        errorState={errorState}
        label="Password"
        name="password"
        onChange={(e) => setUserCredential({ ...userCredential, password: e })}
      />
      <PasswordInput
        errorState={errorState}
        label="confirme Password"
        name="confirmPassword"
        onChange={(e) =>
          setUserCredential({ ...userCredential, confirmPassword: e })
        }
      />
      <Checkbox
        isSelected={acceptTerms}
        onValueChange={() => {
          setUserCredential({ ...userCredential, acceptTerms: !acceptTerms }),
            setAcceptTerms(!acceptTerms);
        }}
      >
        <span className=" text-[1rem] text-zinc-500 ">
          I acknowledge and agree to the terms and conditions of the website
        </span>
      </Checkbox>
      <Button
        isDisabled={!acceptTerms}
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

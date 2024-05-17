"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import { EmailInput, PasswordInput } from "../inputs";
import SelectSkill from "../SelectSkill";
import CheckBox from "../CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, RadioGroup } from "@nextui-org/react";
import { CustomRadio } from "../RadiosGroup";
import { userInfoType } from "@/types/types";
import { ZodIssue, z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpAction, resetAuthState } from "@/redux/slices/authSlice";
const SignupPageForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isLoading, userCreated, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [userCredential, setUserInfo] = useState<userInfoType>({
    signInFor: "Projects",
    email: null,
    password: null,
    confirmPassword: null,
    field: "Web Developer",
  });
  const [errorState, setErrorState] = useState<ZodIssue | null>(null);
  const User = z
    .object({
      signInFor: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(30),
      confirmPassword: z.string().min(6).max(30),
      field: z.string(),
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
      dispatch(SignUpAction(userCredential));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (userCreated) {
      toast.success(userCreated.message);
      router.push("/auth/signin");
    }
    dispatch(resetAuthState())
  }, [error, userCreated,dispatch,router]);

  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex gap-6 flex-col">
      <div className="pt-5">
        <p className=" font-medium text-gray-500 pb-2">sign in for ?</p>
        <RadioGroup
          defaultValue="Projects"
          onValueChange={(e) =>
            setUserInfo({
              ...userCredential,
              signInFor: e as "Projects" | "Designs",
            })
          }
        >
          <div className=" flex flex-col gap-8 md:flex-row">
            <CustomRadio value="Projects">Projects</CustomRadio>
            <CustomRadio value="Designs">Designs</CustomRadio>
          </div>
        </RadioGroup>
      </div>
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
      <SelectSkill
        handleSelectionChange={(e) =>
          setUserInfo({ ...userCredential, field: e })
        }
      />
      <CheckBox
        color="primary"
        calssName=" text-sm "
        text="I acknowledge and agree to abide by the rules and regulations outlined by the website, as well as its privacy policy."
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

export default SignupPageForm;

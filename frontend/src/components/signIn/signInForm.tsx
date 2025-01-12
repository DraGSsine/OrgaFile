"use client";
import React, { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { SignInAction } from "@/redux/slices/authSlice";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { AppDispatch } from "@/redux/store";
import { userInfoType } from "@/types/types";
import cookies from "js-cookie";
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(30),
  acceptTerms: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the terms and conditions"
    ),
});

const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    setErrors({});
    const userInfo: userInfoType = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      acceptTerms: true,
    };

    try {
      const validatedUser: userInfoType = userSchema.parse(userInfo);
      const signInResult = await dispatch(SignInAction(validatedUser));

      if (SignInAction.fulfilled.match(signInResult)) {
        const plan = cookies.get("plan") || "Standard";
        const checkoutResult = await dispatch(createCheckoutSession(plan));

        if (createCheckoutSession.fulfilled.match(checkoutResult)) {
          toast.success("Sign in successful");
          router.push(checkoutResult.payload.url);
          return;
        } else {
          toast.error(
            (signInResult.payload.message as string) || "Sign in failed"
          );
          return;
        }
      }
      toast.error((signInResult.payload as string) || "Sign up failed");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-6 flex-col">
      <Input
        label="Email"
        name="email"
        ref={emailRef}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        ref={passwordRef}
        isInvalid={!!errors.password}
        errorMessage={errors.password}
      />
      <Button
        type="submit"
        color="primary"
        className="w-full h-[48px] text-lg"
        isLoading={isLoading}
        onClick={handleSignin}
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;

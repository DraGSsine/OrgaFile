"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { AppDispatch } from "@/redux/store";
import { SignUpAction } from "@/redux/slices/authSlice";
import { createCheckoutSession } from "@/redux/slices/paymentSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import cookies from "js-cookie";

const userSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, "You must accept terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupPageForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    setErrors({});

    const plan = cookies.get("plan");
    if (plan === "Basic" || plan === "Gold" || plan === "Standard") {
      try {
        const validatedUser = userSchema.parse({ ...formData, acceptTerms });

        const signUpResult = await dispatch(SignUpAction(validatedUser));
        if (SignUpAction.fulfilled.match(signUpResult)) {
          const checkoutResult = await dispatch(createCheckoutSession());
          if (createCheckoutSession.fulfilled.match(checkoutResult)) {
            toast.success("Sign up successful");
            router.push(checkoutResult.payload.url);
            return;
          } else {
            toast.error(
              (signUpResult.payload.message as string) || "Sign up failed"
            );
            return;
          }
        }
        toast.error((signUpResult.payload as string) || "Sign up failed");
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
    } else {
      setIsLoading(false);
      router.push("/pricing");
      toast.info("Please select a plan");
    }
  };

  return (
    <form className="flex gap-6 flex-col">
      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, fullName: e.target.value }))
        }
        isInvalid={!!errors.fullName}
        errorMessage={errors.fullName}
      />
      <Input
        label="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        isInvalid={!!errors.email}
        errorMessage={errors.email}
      />
      <Input
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        isInvalid={!!errors.password}
        errorMessage={errors.password}
      />
      <Input
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
      />

      <Checkbox
        isSelected={acceptTerms}
        onValueChange={setAcceptTerms}
        className="py-4"
        size="sm"
      >
        I agree with the&nbsp;
        <Link className=" text-primary-color " href="/legal">
          terms & privacy policy
        </Link>
      </Checkbox>
      <Button
        type="button"
        color="primary"
        className="w-full h-[48px] text-lg"
        isLoading={isLoading}
        onClick={handleSignup}
        isDisabled={!acceptTerms}
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignupPageForm;

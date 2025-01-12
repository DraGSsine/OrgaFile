"use client";
import { sendEmail } from "@/helpers/mail";
import { Button } from "@nextui-org/button";
import { Loading03Icon, Mail01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { toast } from "sonner";
const SendEmailForm = () => {
  const [email, setEmail] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const HandleSubmiteEmail = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    const { err } = await sendEmail(email);
    if (err) {
      setIsLoading(false);
      toast.error("Failed to subscribe. Please try again later.");
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Subscribed successfully!");
    }, 2000);
  };
  return (
    <form action="" className="mt-12">
      <div className="relative flex items-center rounded-full border border-primary/20 bg-white px-2 shadow-md dark:border-white/10 dark:bg-dark md:p-2 lg:pr-3">
        <div className="py-3 pl-4 lg:pl-5">
          <Mail01Icon size={24} stroke="#4b81f7" />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="Enter your email address"
          className="w-full rounded-full bg-transparent p-4 placeholder-gray-600 dark:placeholder-white outline-none"
          type="email"
        />
        <div className="md:pr-1.5 lg:pr-0">
          <Button
            onClick={(e)=>HandleSubmiteEmail(e)}
            variant="solid"
            color="primary"
            className=" rounded-full p-5 min-w-28"
          >
            {IsLoading ? (
              <Loading03Icon
                size={24}
                stroke="#fff"
                className=" animate-spin"
              />
            ) : (
              <>Subscribe</>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SendEmailForm;

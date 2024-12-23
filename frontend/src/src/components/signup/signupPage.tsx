import React from "react";
import SignupPageForm from "./SignupPageForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="w-full md:w-[50%] lg:w-[60%] flex flex-col items-center justify-center">
      <div className="w-[80%] py-20">
        <div>
          <h1 className=" font-semibold text-3xl pb-3">Sign Up</h1>
          <p className=" capitalize pb-7">Have an account <Link href='/auth/signin' className=" font-semibold text-primary-color">sign in</Link> </p>
        </div>
        <SignupPageForm />
      </div>
    </div>
  );
};

export default SignupPage;

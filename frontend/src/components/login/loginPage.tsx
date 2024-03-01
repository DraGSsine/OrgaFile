import React from "react";
import Link from "next/link";
import {LoginForm} from "./loginForm";

const LoginPage = () => {
  return (
    <div className="w-full md:w-[50%] lg:w-[60%] flex flex-col items-center justify-center">
      <div className="w-[80%] py-20">
        <div>
          <h1 className=" font-semibold text-3xl pb-3">login</h1>
          <p className=" pb-7">i don't have an account <Link href='/auth/signup' className=" font-semibold text-primary-color">Sign up</Link> </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "../../../public/icons";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight01Icon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "OrgaFile",
  description: "OrgaFile is a file management system powered by AI and designed to streamline file and folder organization.",
};
const Hero = () => {
  return (
    <section className=" flex flex-col items-center " >
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <h1 className=" text-6xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2 ">Streamline Your Day</span>
          <span className=" inline-block duration-700 leading-[5rem]">
            Organize Your Files Effortlessly
          </span>
        </h1>
        <p className="pt-4 pb-14 capitalize text-center mt-4 text-zinc-400 max-w-[60%] text-medium leading-8 ">
          OrgaFile is a cutting-edge document management system powered by AI.
          Our sophisticated platform is designed to streamline file and folder
          organization, ensuring seamless efficiency and accessibility for you
        </p>
        <div className=" flex space-x-8">
          <Link href="/auth/signup" className=" flex items-center justify-center p-2 rounded-full px-4 transition-all duration-300 ease-in hover:opacity-90 text-white bg-blue-500">
            Get Started
            <ArrowRight01Icon className=" font-bold" size={25} />
          </Link>
          <Link href="/legal" className=" flex items-center justify-center p-2 rounded-full px-4 transition-all duration-300 ease-in hover:opacity-90 border text-primary-500 bg-white border-blue-500 ">
            Learn More
            <ArrowRight01Icon className=" font-bold" size={25} />
          </Link>
        </div>
      </div>
      <div className="relative ">
        <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4bf76e] to-primary-color opacity-30 left-[20%] sm:w-[72.1875rem]"
          />
        </div>

        <div className=" rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4">
          <Image
            src="/images/dashboard.png"
            alt="product preview"
            width={1200}
            height={800}
            quality={100}
            className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4bf76e] to-[#4b81f7] opacity-30 left-[70%] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

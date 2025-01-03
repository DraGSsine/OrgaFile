import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "../../../public/icons";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight01Icon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "OrgaFile | AI-Powered File Organization Made Simple",
  description:
    "Transform your messy files into an organized system with OrgaFile's AI-powered document management. Upload multiple files at once and let our smart algorithm categorize and rename them automatically.",
  openGraph: {
    title: "OrgaFile | AI-Powered File Organization Made Simple",
    description:
      "Transform your messy files into an organized system with OrgaFile's AI-powered document management.",
    images: [
      {
        url: "/images/dashboard.png",
      },
    ],
  },
};

const Hero = () => {
  return (
    <section className=" flex flex-col items-center ">
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <h1 className="text-6xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2">
            Organize Files Instantly
          </span>
          <span className="inline-block duration-700 leading-[5rem]">
            With AI-Powered Intelligence
          </span>
        </h1>
        <p className="pt-4 pb-14 text-center mt-4 text-zinc-400 max-w-[60%] text-medium leading-8">
          Stop wasting time manually organizing files. OrgaFile uses AI to
          automatically analyze, rename, and categorize your documents, making
          file management effortless. Upload once, stay organized forever.
        </p>
        <div className="flex space-x-8">
          <Link
            href="/pricing"
            className="flex items-center justify-center p-3 rounded-full px-6 transition-all duration-300 ease-in hover:opacity-90 text-white bg-blue-500 font-medium"
          >
            Try It Now
            <ArrowRight01Icon className="font-bold ml-2" size={25} />
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center justify-center p-3 rounded-full px-6 transition-all duration-300 ease-in hover:opacity-90 border text-primary-500 bg-white border-blue-500 font-medium"
          >
            How It Works
            <ArrowRight01Icon className="font-bold ml-2" size={25} />
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

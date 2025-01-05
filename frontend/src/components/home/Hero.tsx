import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight01Icon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "OrgaFile | Smart File Categorization & Organization",
  description:
    "Say goodbye to messy folders. OrgaFile's AI automatically analyzes your files and sorts them into perfect categories, bringing order to your digital workspace instantly.",
  openGraph: {
    title: "OrgaFile | Smart File Categorization & Organization",
    description:
      "Say goodbye to messy folders. OrgaFile's AI automatically analyzes your files and sorts them into perfect categories.",
    images: [
      {
        url: "/images/dashboard.png",
      },
    ],
  },
};

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-4 ">
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2">
            Smart File Categorization
          </span>
          <span className="inline-block duration-700 leading-[5rem]">
            Powered by AI
          </span>
        </h1>
        <p className="pt-4 pb-14 text-center mt-4 text-zinc-400 max-w-[600px] text-medium leading-8">
          Drop your messy files and watch the magic happen. OrgaFile&apos;s AI
          instantly analyzes each file&apos;s content and automatically sorts them
          into the perfect categories - whether it&apos;s business documents, sports
          data, or personal files. No more manual sorting needed.
        </p>
        <div className="flex space-x-8">
          <Link
            href="/pricing"
            className="flex items-center justify-center p-3 rounded-full xl:px-6 transition-all duration-300 ease-in hover:opacity-90 text-white bg-primary-color font-medium"
          >
            Start Organizing
            <ArrowRight01Icon className="font-bold ml-2 w-12 h-8 " />
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center justify-center p-3 rounded-full xl:px-6 transition-all duration-300 ease-in hover:opacity-90 border text-primary-color bg-white border-primary-color font-medium"
          >
            See How It Works
            <ArrowRight01Icon className="font-bold ml-2 w-12 h-8 " />
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4bf76e] to-primary-color opacity-30 left-[20%] sm:w-[72.1875rem]"
          />
        </div>

        <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4">
          <Image
            src="/images/dashboard.png"
            alt="OrgaFile dashboard showing smart file categorization"
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

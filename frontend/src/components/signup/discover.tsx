import React from "react";
import { Card } from "./card";
import Link from "next/link";

const Discover = () => {
  return (
    <div className="hidden sm:flex items-center h-full md:flex w-[50%] lg:w-[40%] bg-primary-color rounded-lg p-10">
      <div className="max-h-[80vh] flex gap-10 2xl:gap-42 flex-col">
        <Link className="font-bold text-white" href="/">
          OrgaFile
        </Link>
        <div className="flex flex-col justify-between gap-10">
          <h1 className="text-white text-2xl sm:text-[2.8rem] font-semibold leading-10 sm:leading-[3.5rem]">
            Let AI organize your messy files automatically
          </h1>
          <p className="text-gray-200 font-extralight">
            Stop spending hours manually sorting files. Upload your documents, and watch as 
            OrgaFile's AI instantly categorizes them into perfect folders. Whether it's business 
            reports, sports data, or personal documents - our smart system knows exactly where 
            each file belongs.
          </p>
        </div>
        <Card />
      </div>
    </div>
  );
};

export default Discover;
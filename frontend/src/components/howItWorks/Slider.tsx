"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Slider = ({ image }: { image: string }) => {
  const { activeStep } = useSelector((state: RootState) => state.landing);

  let translateX = 0;
  if (activeStep === "Step 1") translateX = 0;
  else if (activeStep === "Step 2") translateX = -90;
  else if (activeStep === "Step 3") translateX = -178;
  return (
    <div className="relative overflow-hidden flex mt-20 rounded-3xl bg-slate-50 px-14 py-16 xl:px-16">
      <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${activeStep != "Step 1" && "opacity-30"}`}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
          <Image
            alt=""
            loading="lazy"
            width={1688}
            height={856}
            decoding="async"
            data-nimg={0}
            className="w-full"
            style={{ color: "transparent" }}
            sizes="52.75rem"
            src={image}
          />
        </div>
      </div>
      <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${activeStep != "Step 2" && "opacity-30"}`}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
          <Image
            alt=""
            loading="lazy"
            width={1688}
            height={856}
            decoding="async"
            data-nimg={0}
            className="w-full"
            style={{ color: "transparent" }}
            sizes="52.75rem"
            src={image}
          />
        </div>
      </div>
      <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${activeStep != "Step 3" && "opacity-30"}`}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
          <Image
            alt=""
            loading="lazy"
            width={1688}
            height={856}
            decoding="async"
            data-nimg={1}
            className="w-full"
            style={{ color: "transparent" }}
            sizes="52.75rem"
            src={image}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;

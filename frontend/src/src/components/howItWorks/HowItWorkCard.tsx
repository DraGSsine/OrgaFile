"use client";
import { setActiveStep } from "@/redux/slices/landingSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

const HowItWorkCard = ({
  step,
  feature,
  description,
  icon,
}: {
  step: string;
  feature: string;
  description: string;
  icon: ReactNode;
}) => {
  const {activeStep} = useSelector((state:RootState) => state.landing);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      onClick={(e) => dispatch(setActiveStep(e.currentTarget.dataset.id))}
      data-id={step}
      className={` max-w-[350px] cursor-pointer flex flex-col gap-4 items-start group ${activeStep == step && "bg-slate-50 border-slate-100"} hover:bg-slate-50  hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5`}
    >
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        {icon}
      </div>
      <div>
        <span className=" inline-block py-3 text-third-color">{step}</span>
        <h3 className="font-semibold text-lg">{feature}</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorkCard;

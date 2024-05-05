import Image from "next/image";
import React, { ReactNode } from "react";

const FeatureCard = ({
  feature,
  description,
  icon,
}: {
  feature: string;
  description: string;
  icon: ReactNode;
}) => {
  return (
    <div className="  w-[300px] flex items-center flex-col ">
      <div className="flex items-center justify-center w-16 h-16 bg-primary-color rounded-lg">
        {icon}
      </div>
      <div className=" flex flex-col items-center">
        <h1 className="text-2xl font-semibold">{feature}</h1>
        <p className="text-zinc-400 text-center">
          {description}
        </p>
      </div>
      <div className=" w-[65px] bg-primary-200 h-[65px] " ></div>
    </div>
  );
};

export default FeatureCard;

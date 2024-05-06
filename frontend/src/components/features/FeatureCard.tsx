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
      <div className=" before:abs before:w-[65px] before:bg-primary-200 before:h-[65px] flex items-center justify-center w-16 h-16 bg-primary-color rounded-lg">
        {icon}
      </div>
      <div className=" flex flex-col items-center">
        <h1 className="text-2xl font-semibold">{feature}</h1>
        <p className="text-zinc-400 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

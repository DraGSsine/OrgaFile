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
    <div className="  w-[300px] flex items-center flex-col gap-8 ">
      <div className=" before:rounded-lg before:-z-30 before:rotate-45 before:absolute before before:scale-110 before:w-[60px] before:bg-primary-200 before:h-[60px] flex items-center justify-center w-16 h-16 bg-primary-color rounded-lg">
        {icon}
      </div>
      <div className=" flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-semibold">{feature}</h1>
        <p className="text-zinc-400 text-center">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

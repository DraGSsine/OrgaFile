import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import FeatureCard from "./FeatureCard";
import { BotMessageSquare, Cloudy, Folders, Share2 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Folders size={34} color="#f8f9fa"/>,
      feature: "File Management",
      description:
        "Doctify Will organize your files in a way that makes sense to you",
    },
    {
      icon: <Share2 size={34} color="#f8f9fa" />,
      feature: "File Sharing",
      description: "Share files with your team or clients with a few clicks",
    },
    {
      icon: <Cloudy size={34} color="#f8f9fa" />,
      feature: "Storage",
      description:
        "Store your files securely in the cloud and access them from anywhere",
    },
    {
      icon: <BotMessageSquare size={34} color="#f8f9fa" />,
      feature: "Ai Search ",
      description:
        "Find any file by it's content in seconds with Doctify's powerful search",
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="py-20">
        <div className="flex flex-col space-y-4">
          <span className=" text-3xl font-semibold text-primary-color ">
            Features
          </span>
          <h1 className=" text-5xl font-semibold ">Main Features Of Doctify</h1>
          <p className=" text-zinc-400">
            Doctify offers powerful features tailored to streamline your file
            organization. Here are some of its standout capabilities
          </p>
        </div>
        <div className=" flex justify-between">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature.feature}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;

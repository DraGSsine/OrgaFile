import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import HowItWorkCard from "./HowItWorkCard";
import Slider from "./Slider";
import { CloudDownloadIcon, CloudIcon, MagicWand01Icon } from "hugeicons-react";

const HowItWorks = () => {
  const features = [
    {
      icon: <CloudIcon size={24} stroke="#4b81f7" />,
      step: "Step 1",
      feature: "Upload Your Files",
      description:
        "Simply drag and drop your messy files into OrgaFile. Our platform accepts pdfs,xls,docs,text files, and more is comming",
    },
    {
      icon: <MagicWand01Icon size={24} stroke="#4b81f7" />,
      step: "Step 2",
      feature: "AI Categorization",
      description:
        "Watch as our AI instantly analyzes your files' content and automatically sorts them into perfect categories. No manual organization needed.",
    },
    {
      icon: <CloudDownloadIcon size={24} stroke="#4b81f7" />,
      step: "Step 3",
      feature: "Access Organized Files",
      description:
        "Find your files instantly in their categorized folders. Download or access your perfectly organized documents from anywhere.",
    },
  ];

  return (
    <MaxWidthWrapper>
      <section
        id="how-it-works"
        className="pb-14 pt-20 sm:pb-20 sm:pt-20 lg:pb-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-24 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
              HOW IT WORKS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
              From Messy to Organized in Seconds
            </h2>
            <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">
              Experience the power of AI-driven file organization. OrgaFile automatically 
              analyzes your documents and sorts them into logical categories, saving you 
              hours of manual work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-8 md:gap-16">
            {features.map((feature, index) => (
              <HowItWorkCard
                key={index}
                step={feature.step}
                icon={feature.icon}
                feature={feature.feature}
                description={feature.description}
              />
            ))}
          </div>
          <div className="hidden lg:mt-20 lg:pt-2 lg:block">
            <Slider />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default HowItWorks;
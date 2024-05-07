import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Cloudy,
  Download,
  WandSparkles,
} from "lucide-react";
import HowItWorkCard from "./HowItWorkCard";
import Slider from "./Slider";

const HowItWorks = () => {
  const features = [
    {
      icon: <Cloudy size={24} stroke="#4b81f7" />,
      step: "Step 1",
      feature: "Upload Files ",
      description:
        "Upload your files and documents, regardless of their format or size. Our intuitive interface ensures a seamless uploading experience.",
    },
    {
      icon: <WandSparkles size={24} stroke="#4b81f7" />,
      step: "Step 2",
      feature: "DocTify Analysis",
      description:
        "Let Doctify work its magic with our AI-driven document management system. Our advanced algorithms analyze your uploads.",
    },
    {
      icon: <Download size={24} stroke="#4b81f7" />,
      step: "Step 3",
      feature: "Download Files",
      description:
        "Accessing your files with one click. Once DocTify has worked its magic, your files are ready for download whenever you need them.",
    },
  ];

  return (
    <MaxWidthWrapper>
      <section
        id="secondary-features"
        aria-label="Features for simplifying everyday business tasks"
        className="pb-14 pt-20 sm:pb-20 sm:pt-20 lg:pb-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-24 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1 ">
              MORE FEATURES
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
              We've got you covered
            </h2>
            <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">
              DocTify is designed to simplify your everyday business tasks. Our
              platform offers a range of features to help you manage your
              documents with ease.
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
            <Slider image={"/images/profit-loss.webp"}/>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default HowItWorks;

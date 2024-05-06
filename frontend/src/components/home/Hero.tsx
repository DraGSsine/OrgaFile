import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "../../../public/icons";
import MaxWidthWrapper from "../MaxWidthWrapper";

const Hero = () => {
  return (
    <MaxWidthWrapper>
      <div className=" w-full flex flex-col items-center pb-10 pt-20">
        <h1 className=" text-6xl md:text-7xl font-bold text-center w-[70%] 3xl:w-[52%] ">
          <span className="boujee-text block py-2 ">Streamline Your Day</span>
          <span className=" inline-block leading-[5rem]">
            Organize Your Files Effortlessly
          </span>
        </h1>
        <p className=" pt-4 pb-14 capitalize text-center mt-4 text-zinc-400 max-w-[60%] text-medium leading-8 ">
          Powered by AI, Doctify offers a sophisticated document management
          system designed to streamline file and folder organization, ensuring
          seamless efficiency and accessibility.
        </p>
        <div className=" space-x-8">
          <Link href="/auth/signup">
            <Button
              endContent={<ArrowRight />}
              variant="solid"
              radius="full"
              className="bg-primary-color text-zinc-50 w-36 text-medium"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              endContent={<ArrowRight />}
              variant="flat"
              color="default"
              radius="full"
              className="text-zinc-800 w-36 text-medium"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;

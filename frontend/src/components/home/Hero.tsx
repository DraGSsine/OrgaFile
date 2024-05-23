import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "../../../public/icons";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Hero = () => {
  return (
    <MaxWidthWrapper>
      <section>
        <div className=" w-full flex flex-col items-center pb-10 pt-20">
          <h1 className=" text-6xl md:text-7xl font-bold text-center w-[70%] 3xl:w-[52%] ">
            <span className="boujee-text block py-2 ">Streamline Your Day</span>
            <span className=" inline-block duration-700 leading-[5rem]">
              Organize Your Files Effortlessly
            </span>
          </h1>
          <p className="pt-4 pb-14 capitalize text-center mt-4 text-zinc-400 max-w-[60%] text-medium leading-8 ">
            Doctify is a cutting-edge document management system powered by AI.
            Our sophisticated platform is designed to streamline file and folder
            organization, ensuring seamless efficiency and accessibility for you
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
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4bf76e] to-primary-color opacity-30 left-[20%] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/images/dashboard.png"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4bf76e] to-[#4b81f7] opacity-30 left-[80%] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Hero;

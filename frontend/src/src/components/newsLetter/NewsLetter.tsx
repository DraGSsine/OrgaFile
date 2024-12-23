import { Mail01Icon } from "hugeicons-react";
import Image from "next/image";
import React from "react";

const NewsLetter = () => {
  return (
    <section className="relative before:absolute before:inset-0 before:h-px before:w-96 before:bg-gradient-to-r before:from-primary-color before:via-secondary-color before:to-transparent after:absolute after:inset-0 after:ml-auto after:mt-auto after:h-px after:w-96 after:bg-gradient-to-l after:from-secondary-color after:via-primary-color after:to-transparent">
      <div className="border-y border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-darker">
        <div className="relative mx-auto px-6 md:max-w-full md:px-12 lg:max-w-6xl xl:px-0">
          <div className="items-end justify-between md:flex">
            <div className="h-max py-16 md:w-6/12 xl:w-5/12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl max-w-[500px] capitalize lea font-bold text-gray-800 dark:text-white md:w-max md:text-4xl xl:text-5xl">
                  One step to improve
                  your workflow
                </h2>
                <p className="mb-8 capitalize mt-6 text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter and get the latest updates and
                  news about OrgaFile.
                </p>
                <form action="" className="mt-12">
                  <div className="relative flex items-center rounded-full border border-primary/20 bg-white p-1 px-2 shadow-md dark:border-white/10 dark:bg-dark md:p-2 lg:pr-3">
                    <div className="py-3 pl-4 lg:pl-5">
                      <Mail01Icon size={30} stroke="white" />
                    </div>
                    <input
                      autoComplete="email"
                      placeholder="Your mail address"
                      className="w-full outline-none rounded-full bg-transparent p-4 placeholder-gray-600 dark:placeholder-white"
                      type="email"
                    />
                    <div className="md:pr-1.5 lg:pr-0">
                      <button
                        type="button"
                        title="Start buying"
                        className="relative ml-auto h-12 w-16 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight sm:w-auto sm:px-6"
                      >
                        <span className="relative hidden w-max font-semibold text-white dark:text-gray-900 md:block">
                          Get Started
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="md:w-[42%] lg:w-1/2">
              {/* <Image
                src="/images/cta-cards.webp"
                alt=""
                loading="lazy"
                width={1299}
                height={678}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

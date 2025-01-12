import React from "react";
import SendEmailForm from "./SendEmailForm";

const NewsLetter = () => {
  return (
    <section className="relative before:absolute before:inset-0 before:h-px before:w-96 before:from-primary-color before:via-secondary-color before:to-transparent after:absolute after:inset-0 after:ml-auto after:mt-auto after:h-px after:w-96 after:from-secondary-color after:via-primary-color after:to-transparent">
      <div className="border-y border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-darker">
        <div className="relative mx-auto px-6 md:max-w-full md:px-12 lg:max-w-6xl xl:px-0">
          <div className="items-end justify-between md:flex">
            <div className="h-max py-16 md:w-6/12 xl:w-5/12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl max-w-[500px] font-bold text-gray-800 dark:text-white md:w-max md:text-4xl xl:text-5xl">
                  Stay Updated with OrgaFile
                </h2>
                <p className="mb-8 mt-6 text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter for the latest updates on
                  AI-powered file organization, productivity tips, and exclusive
                  OrgaFile features.
                </p>
                  <SendEmailForm />
              </div>
            </div>
            <div className="md:w-[42%] lg:w-1/2">
              {/* <Image
                src="/images/newsletter-illustration.png"
                alt="File organization illustration"
                loading="lazy"
                width={600}
                height={400}
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

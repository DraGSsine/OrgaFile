import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Features = () => {
  return (
    <MaxWidthWrapper>
      <div className="mt-48">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Everything you need to
          <span className="text-indigo-600"> manage Your Files </span>
        </h2>
        <p className="pretty-text-small w-[60%]">
          Doctify redefines file management with simplicity and ease of use at
          its core. Leveraging AI, it seamlessly brings your files together and
          organizes them effortlessly, revolutionizing your approach to document
          organization.
        </p>
      </div>
      <div className=" w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-16 gap-10">
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-3">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/1.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1 ">
                <span> Artificle intiligent </span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span> File Organaizer </span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Doctify harnesses the advanced capabilities of GPT-4 to
                  efficiently process and organize your files. Seamlessly
                  categorizing them into folders based on their respective
                  topics, Doctify streamlines your document management
                  experience
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-2">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/1.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1 ">
                <span>simplisty</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Ai search</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Doctify uses Ai to search for your files by it's content and
                  give you the best result just by enter a keyword doctiyf will
                  searhc for the best result
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />

              <Image
                src="/images/2.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1 ">
                <span>Team Work</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Share Files</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Easily and swiftly share your files with your team using
                  Doctify's intuitive sharing features
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/1.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1 ">
                <span>cloud</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>File storage</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Safely store your files in the cloud with Doctify, ensuring
                  secure access from anywhere in the world.
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/2.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={909}
                height={823}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-gray-100 border-gray-200 border text-gray-800 rounded-full text-xs font-medium px-3 py-1 ">
                <span>Modern</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span> Experince </span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Our focus is on making Doctify incredibly user-friendly and
                  straightforward.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;

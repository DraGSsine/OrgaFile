import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Features = () => {
  return (
    <MaxWidthWrapper>
      <div className="mt-48">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Experience the Future of
          <span className="text-primary-500"> File Management </span>
        </h2>
        <p className="pretty-text-small w-[60%]">
          OrgaFile redefines file management, prioritizing simplicity and ease
          of use. Leveraging AI technology, OrgaFile effortlessly organizes your
          files, revolutionizing your approach to document organization.
        </p>
      </div>
      <div className=" w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-16 gap-10">
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-3">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/folders.png"
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
                <span> AI File Organization </span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span> Smart Document Categorization </span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  OrgaFile harnesses the advanced capabilities of AI to
                  efficiently process and organize your files. Our AI seamlessly
                  categorizes your documents into relevant folders, streamlining
                  your document management experience.
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl relative p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-2">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/share.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-500 rounded-full text-xs font-medium px-3 py-1 ">
                <span>Efficient Access</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span> File Renaming</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  OrgaFile enhances file management by renaming files to improve
                  readability and facilitate easier retrieval.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10 ">
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 relative ring-gray-200/50 shadow hover:shadow-lg">
            <span className="bg-green-100 border-green-200 absolute z-10 -top-3 -translate-x-[50%]  left-[50%] border text-green-600 rounded-full text-xs font-medium px-3 py-1">
              Coming soon
            </span>
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />

              <Image
                src="/images/search.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-500 rounded-full text-xs font-medium px-3 py-1">
                AI-Powered Search
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                Intuitive File Retrieval
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                OrgaFile uses Ai to search for your files by it&apos;s content
                and give you the best result just by enter a keyword doctiyf
                will searhc for the best result
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/files.png"
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
                <span>Cloud Storage</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Store Files Safely</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Store your files securely in the cloud with OrgaFile. Our
                  platform ensures that your documents are accessible from
                  anywhere in the world, while maintaining robust security
                  measures.
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/dashboard.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width={909}
                height={823}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-500 rounded-full text-xs font-medium px-3 py-1 ">
                <span>Contemporary Design</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span> User-Friendly Experience </span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  At OrgaFile, we prioritize the user experience. Our platform
                  is designed to be incredibly user-friendly and
                  straightforward, making file management a breeze.
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

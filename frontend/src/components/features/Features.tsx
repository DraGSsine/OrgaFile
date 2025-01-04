import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Features = () => {
  return (
    <MaxWidthWrapper>
      <div className="mt-48">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Smart Organization for
          <span className="text-primary-color"> Every File </span>
        </h2>
        <p className="pretty-text-small w-[60%]">
          OrgaFile transforms how you manage files by automatically analyzing
          and categorizing your documents. Our AI understands your file&apos;s
          content and organizes them into logical categories, saving you hours
          of manual work.
        </p>
      </div>
      <div className="w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-16 gap-10">
          <div className="rounded-lg p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-3">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/folders.png"
                alt="AI-powered file categorization system"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
                <span>Smart Categorization</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Automatic File Organization</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Upload your files and watch as our AI instantly analyzes their
                  content and sorts them into the perfect categories. Whether
                  it&apos;s business documents, personal files, or project materials,
                  OrgaFile knows exactly where each file belongs.
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-lg relative p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-2">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/filerename.png"
                alt="Smart file renaming feature"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-color rounded-full text-xs font-medium px-3 py-1">
                <span>Smart Naming</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Intelligent File Renaming</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Our AI analyzes file content and suggests clear, descriptive
                  names that make it easy to find what you need. Say goodbye to
                  cryptic file names and hello to organized efficiency.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
          <div className="rounded-lg p-8 bg-gray-50 transition-all ring-1 relative ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/customcategorization.png"
                alt="AI-powered content search feature"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-color rounded-full text-xs font-medium px-3 py-1">
                Customization
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                custom categorization
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                Create custom categories to organize your files exactly how you
                want. Whether it&apos;s by project, client, or department, you can
                tailor OrgaFile to fit your unique needs.
              </p>
            </div>
          </div>
          <div className="rounded-lg p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/files.png"
                alt="Secure cloud storage feature"
                className="h-full w-full object-contain"
                loading="lazy"
                width={1280}
                height={800}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
                <span>Cloud Storage</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Secure Cloud Access</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Access your organized files from anywhere with our secure
                  cloud storage. Your documents are protected with
                  enterprise-grade security while remaining easily accessible
                  whenever you need them.
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-lg p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
            <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10" />
              <Image
                src="/images/dashboard.png"
                alt="User-friendly dashboard interface"
                className="h-full w-full object-contain"
                loading="lazy"
                width={909}
                height={823}
                decoding="async"
              />
            </div>
            <div className="mt-2">
              <span className="bg-indigo-100 border-indigo-200 border text-primary-color rounded-full text-xs font-medium px-3 py-1">
                <span>Modern Interface</span>
              </span>
              <h3 className="text-xl lg:text-2xl font-medium mt-2">
                <span>Intuitive Dashboard</span>
              </h3>
              <p className="text-slate-600 mt-2 [text-wrap:balance]">
                <span>
                  Experience file management made simple with our modern,
                  intuitive interface. Everything you need is just a click away,
                  making organization effortless and enjoyable.
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

import Link from "next/link";
import Image from "next/image";
import { ArrowRight01Icon } from "hugeicons-react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-4 animate-section">
      {/* Product Hunt Badge */}

      {/* Headline and Subheadline */}
      <div className="w-full flex flex-col items-center pt-20 pb-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2">
            Instant File Organization
          </span>
          <span className="inline-block leading-[5rem] text-black">
            Powered-by AI
          </span>
        </h1>
        <p className="pt-4 pb-14 text-center mt-4 text-zinc-500 max-w-[600px] text-medium leading-8">
          Stop wasting hours on manual file management. OrgaFile&apos;s AI
          automatically analyzes, renames, and organizes your files into smart
          categories. Perfect for professionals who value their time and need a
          clutter-free workflow.
        </p>

        {/* Featured Stats */}
        <div className="grid grid-cols-3 gap-8 mb-10 text-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary">20+</span>
            <span className="text-sm text-zinc-500">Hours Saved Monthly</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary">10x</span>
            <span className="text-sm text-zinc-500">Faster Organization</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary">100%</span>
            <span className="text-sm text-zinc-500">Automated</span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/signup"
            className="group flex items-center justify-center p-2 rounded-full px-4  text-white bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>Get Started</span>
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/demo"
            className="group flex items-center justify-center p-2 rounded-full px-4  border border-slate-200 bg-white text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>Watch Demo</span>
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Hero Image with Overlay Badge */}
      <div className="relative rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4 transition-all duration-500">
        <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
          New: Smart File Renaming
        </div>
        <Image
          src="/images/dashboard.png"
          alt="OrgaFile dashboard showing AI-powered file organization"
          width={1400}
          height={1000}
          quality={85}
          priority
          className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
        />
      </div>
    </section>
  );
};

export default Hero;

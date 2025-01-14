import Link from "next/link";
import Image from "next/image";
import { ArrowRight01Icon } from "hugeicons-react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-4 animate-section">
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2">Organize in Seconds.</span>
          <span className="inline-block leading-[5rem]">Save Hours</span>
        </h1>

        <p className="pt-4 pb-14 text-center mt-4 text-zinc-500 max-w-[600px] text-medium leading-8">
          Tired of endless file searching? Our AI-powered system analyzes and
          categorizes your files in seconds, giving you instant access to
          everything you need.
        </p>

        <div className="flex space-x-8">
          <Link
            href="/pricing"
            className="group flex items-center justify-center p-2 rounded-full px-6 text-white bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>Start Organizing</span>
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#how-it-works"
            className="group flex items-center justify-center p-2 rounded-full px-6 border border-slate-200 bg-white text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>See How It Works</span>
            <ArrowRight01Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4 transition-all duration-500">
        <Image
          src="/images/dashboard.png"
          alt="OrgaFile dashboard showing smart file categorization"
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

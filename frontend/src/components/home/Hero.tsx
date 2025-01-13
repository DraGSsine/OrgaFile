"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight01Icon } from "hugeicons-react";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 animate-section"
    >
      <style jsx>{`
        .animate-section {
          --stagger-delay: 100ms;
        }
        
        .animate-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-section.is-visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-section.is-visible > *:nth-child(1) { transition-delay: calc(var(--stagger-delay) * 1); }
        .animate-section.is-visible > *:nth-child(2) { transition-delay: calc(var(--stagger-delay) * 2); }
        .animate-section.is-visible > *:nth-child(3) { transition-delay: calc(var(--stagger-delay) * 3); }
      `}</style>

      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          <span className="boujee-text block py-2">Smart File Categorization</span>
          <span className="inline-block leading-[5rem]">Powered by AI</span>
        </h1>

        <p className="pt-4 pb-14 text-center mt-4 text-zinc-500 max-w-[600px] text-medium leading-8">
          Drop your messy files and watch the magic happen. OrgaFile&apos;s AI
          instantly analyzes each file&apos;s content and automatically sorts them
          into the perfect categories—whether it&apos;s business documents, sports
          data, or personal files. No more manual sorting needed.
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
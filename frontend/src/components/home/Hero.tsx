"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight01Icon } from "hugeicons-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.45, 0.27, 0.9],
        delay: delay * 0.1,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.45, 0.27, 0.9],
        delay: 0.2,
      },
    },
  };

  return (
    <section className="flex flex-col items-center px-4">
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        {/* Show content immediately but animate it */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="text-5xl md:text-7xl font-bold text-center opacity-0"
        >
          <span className="boujee-text block py-2">
            Smart File Categorization
          </span>
          <span className="inline-block duration-700 leading-[5rem]">
            Powered by AI
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={2}
          className="pt-4 pb-14 text-center mt-4 text-zinc-400 max-w-[600px] text-medium leading-8 opacity-0"
        >
          Drop your messy files and watch the magic happen. OrgaFile&apos;s AI
          instantly analyzes each file&apos;s content and automatically sorts them
          into the perfect categories - whether it&apos;s business documents, sports
          data, or personal files. No more manual sorting needed.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={3}
          className="flex space-x-8 opacity-0"
        >
          <Link
            href="/pricing"
            className="group flex items-center justify-center p-2 rounded-full px-6 transition-all duration-300 ease-in hover:opacity-90 text-white bg-primary-color"
          >
            <span>Start Organizing</span>
            <motion.span
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight01Icon className="font-bold" />
            </motion.span>
          </Link>
          <Link
            href="#how-it-works"
            className="group flex items-center justify-center p-2 rounded-full px-6 transition-all duration-300 ease-in hover:opacity-90 border border-slate-200 bg-white text-primary-color"
          >
            <span>See How It Works</span>
            <motion.span
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight01Icon className="font-bold" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary-color to-primary-color opacity-30 left-[20%] sm:w-[72.1875rem]"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4"
        >
          <Image
            src="/images/dashboard.png"
            alt="OrgaFile dashboard showing smart file categorization"
            width={1400}
            height={1000}
            quality={85}
            priority={true}
            onLoadingComplete={() => setIsLoaded(true)}
            className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary-color to-[#4b81f7] opacity-30 left-[70%] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
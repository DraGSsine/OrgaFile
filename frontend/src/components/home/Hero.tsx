"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight01Icon } from "hugeicons-react";
import { motion, useAnimation } from "framer-motion";

const Hero = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay:any) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay * 0.1,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <section className="flex flex-col items-center px-4">
      <div className="w-full flex flex-col items-center pb-10 pt-20">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          custom={1}
          className="text-5xl md:text-7xl font-bold text-center"
        >
          <span className="boujee-text block py-2">Smart File Categorization</span>
          <span className="inline-block leading-[5rem]">Powered by AI</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          custom={2}
          className="pt-4 pb-14 text-center mt-4 text-zinc-400 max-w-[600px] text-medium leading-8"
        >
          Drop your messy files and watch the magic happen. OrgaFile&apos;s AI
          instantly analyzes each file&apos;s content and automatically sorts them
          into the perfect categories—whether it&apos;s business documents, sports
          data, or personal files. No more manual sorting needed.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          custom={3}
          className="flex space-x-8"
        >
          <Link
            href="/pricing"
            className="group flex items-center justify-center p-2 rounded-full px-6 transition-transform hover:scale-105 text-white bg-primary-color"
          >
            <span>Start Organizing</span>
            <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="ml-2">
              <ArrowRight01Icon className="font-bold" />
            </motion.span>
          </Link>
          <Link
            href="#how-it-works"
            className="group flex items-center justify-center p-2 rounded-full px-6 transition-transform hover:scale-105 border border-slate-200 bg-white text-primary-color"
          >
            <span>See How It Works</span>
            <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="ml-2">
              <ArrowRight01Icon className="font-bold" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={imageVariants}
        className="rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-lg p-4"
      >
        <Image
          src="/images/dashboard.png"
          alt="OrgaFile dashboard showing smart file categorization"
          width={1400}
          height={1000}
          quality={85}
          priority
          className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
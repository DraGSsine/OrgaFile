"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCardProps {
  image: string;
  alt: string;
  badge: {
    text: string;
    color: "purple" | "indigo";
  };
  title: string;
  description: string;
  className?: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  alt,
  badge,
  title,
  description,
  className = "",
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Updated badge styles with better contrast ratios
  const badgeStyles = {
    purple: "bg-purple-100 border-purple-200 text-purple-800", // Darker purple text
    indigo: "bg-indigo-100 border-indigo-200 text-indigo-700", // Darker indigo text that meets contrast requirements
  };

  return (
    <motion.div
      className={`rounded-xl p-8 bg-white/50 backdrop-blur-sm transition-all 
      ring-1 ring-gray-200/50 hover:ring-2 hover:ring-primary-200
      shadow-sm hover:shadow-xl relative ${className}`}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent z-10"
          animate={{
            opacity: isHovered ? 0.3 : 0.7,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
        >
          <Image
            src={image}
            alt={alt}
            className="h-full w-full object-contain"
            loading="lazy"
            width={1280}
            height={800}
            quality={90}
          />
        </motion.div>
      </div>
      <div className="mt-4 space-y-3">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={`${
            badgeStyles[badge.color]
          } border rounded-full text-xs font-semibold px-3 py-1 inline-block`} // Changed font-medium to font-semibold
        >
          {badge.text}
        </motion.span>
        <motion.h3
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="text-xl lg:text-2xl font-semibold mt-2 text-gray-900" // Removed gradient for better contrast
        >
          {title}
        </motion.h3>
        <motion.p
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="text-gray-700 leading-relaxed [text-wrap:balance]" // Darkened text color
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      id: "feature-1",
      className: "lg:col-span-3",
      image: "/images/folders.png",
      alt: "AI-powered file categorization system",
      badge: { text: "Smart Categorization", color: "purple" as const },
      title: "Automatic File Organization",
      description:
        "Upload your files and watch as our AI instantly analyzes their content and sorts them into the perfect categories. Whether it's business documents, personal files, or project materials, OrgaFile knows exactly where each file belongs.",
    },
    {
      id: "feature-2",
      className: "lg:col-span-2",
      image: "/images/filerename.png",
      alt: "Smart file renaming feature",
      badge: { text: "Smart Naming", color: "indigo" as const },
      title: "Intelligent File Renaming",
      description:
        "Our AI analyzes file content and suggests clear, descriptive names that make it easy to find what you need. Say goodbye to cryptic file names and hello to organized efficiency.",
    },
  ];

  const additionalFeatures = [
    {
      id: "feature-3",
      image: "/images/customcategorization.png",
      alt: "AI-powered content search feature",
      badge: { text: "Customization", color: "indigo" as const },
      title: "Custom Categorization",
      description:
        "Create custom categories to organize your files exactly how you want. Whether it's by project, client, or department, you can tailor OrgaFile to fit your unique needs.",
    },
    {
      id: "feature-4",
      image: "/images/files.png",
      alt: "Secure cloud storage feature",
      badge: { text: "Cloud Storage", color: "purple" as const },
      title: "Secure Cloud Access",
      description:
        "Access your organized files from anywhere with our secure cloud storage. Your documents are protected with enterprise-grade security while remaining easily accessible whenever you need them.",
    },
    {
      id: "feature-5",
      image: "/images/dashboard.png",
      alt: "User-friendly dashboard interface",
      badge: { text: "Modern Interface", color: "indigo" as const },
      title: "Intuitive Dashboard",
      description:
        "Experience file management made simple with our modern, intuitive interface. Everything you need is just a click away, making organization effortless and enjoyable.",
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="mt-32 md:mt-48 space-y-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.21, 0.45, 0.27, 0.9],
            },
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mb-6">
            Smart Organization for{" "}
            <span className=" bg-gradient-to-tr from-primary-400 to-primary-800 text-transparent bg-clip-text "> {/* Updated gradient to solid color */}
              Every File
            </span>
          </h2>
          <p className="text-lg text-gray-700 mx-auto max-w-2xl"> {/* Darkened text color */}
            OrgaFile transforms how you manage files by automatically analyzing
            and categorizing your documents. Our AI understands your file&apos;s
            content and organizes them into logical categories, saving you hours
            of manual work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              className={feature.className}
              image={feature.image}
              alt={feature.alt}
              badge={feature.badge}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              image={feature.image}
              alt={feature.alt}
              badge={feature.badge}
              title={feature.title}
              description={feature.description}
              index={index + features.length}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;
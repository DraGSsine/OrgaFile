"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../MaxWidthWrapper";

type BadgeColor = "purple" | "indigo";

interface Badge {
  text: string;
  color: BadgeColor;
}

interface Feature {
  id: string;
  className?: string;
  image: string;
  alt: string;
  badge: Badge;
  title: string;
  description: string;
}

interface FeatureCardProps extends Feature {
  index: number;
}

const BADGE_STYLES: Record<BadgeColor, string> = {
  purple: "bg-purple-100 border-purple-200 text-purple-800",
  indigo: "bg-indigo-100 border-indigo-200 text-indigo-800",
};

const ANIMATION_CONFIG = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] },
  },
  initial: { scale: 1 },
};

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

  return (
    <motion.div
      className={`rounded-xl p-8 bg-white/50 backdrop-blur-sm transition-all
        ring-1 ring-gray-200/50 hover:ring-2 hover:ring-primary-200
        shadow-sm hover:shadow-xl relative ${className}`}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent z-10"
          animate={{ opacity: isHovered ? 0.3 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-full h-full"
          variants={ANIMATION_CONFIG}
          animate={isHovered ? "hover" : "initial"}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={`${BADGE_STYLES[badge.color]} border rounded-full text-xs font-semibold px-3 py-1 inline-block`}
        >
          {badge.text}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="text-xl lg:text-2xl font-semibold mt-2 text-gray-900"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="text-gray-700 leading-relaxed [text-wrap:balance]"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const FEATURES: Feature[] = [
  {
    id: "feature-1",
    className: "lg:col-span-3",
    image: "/images/folders.png",
    alt: "AI file organization system showing smart categorization in action",
    badge: { text: "Smart AI", color: "purple" },
    title: "10x Faster File Organization",
    description:
      "Drop files anywhere - our AI sorts them instantly. Perfect for business docs, projects, or personal files. Save 4+ hours weekly on manual organization.",
  },
  {
    id: "feature-2",
    className: "lg:col-span-2",
    image: "/images/filerename.png",
    alt: "Automatic file renaming demonstration with before and after examples",
    badge: { text: "Time Saver", color: "indigo" },
    title: "Smart File Names That Make Sense",
    description:
      "No more confusing file names. Our AI reads content and creates clear, searchable names instantly. Find any file in seconds, not minutes.",
  },
];

const ADDITIONAL_FEATURES: Feature[] = [
  {
    id: "feature-3",
    image: "/images/customcategorization.png",
    alt: "Custom category creation interface with drag-and-drop functionality",
    badge: { text: "Flexible", color: "indigo" },
    title: "Your Categories, Your Rules",
    description:
      "Create custom folders that match your workflow. Drag, drop, and organize files your way. Perfect for teams and complex projects.",
  },
  {
    id: "feature-4",
    image: "/images/files.png",
    alt: "Secure cloud storage dashboard showing encryption status",
    badge: { text: "Secure", color: "purple" },
    title: "Bank-Grade Security",
    description:
      "Access files anywhere with military-grade encryption. Your data stays private with automatic backups and real-time sync across devices.",
  },
  {
    id: "feature-5",
    image: "/images/dashboard.png",
    alt: "Modern dashboard interface showing file analytics and quick actions",
    badge: { text: "Simple", color: "indigo" },
    title: "3-Click File Management",
    description:
      "Master your files in minutes, not hours. Clean dashboard, powerful search, and instant previews make file management actually enjoyable.",
  },
];

const Features = () => {
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
            Organize Files{" "}
            <span className="bg-gradient-to-tr from-primary-400 to-primary-800 text-transparent bg-clip-text">
              5x Faster
            </span>
          </h2>
          <p className="text-lg text-gray-700 mx-auto max-w-2xl">
            Stop wasting hours on manual file sorting. Our AI analyzes and organizes
            your files instantly, saving you 20+ hours monthly. Try it now!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDITIONAL_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              index={index + FEATURES.length}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;
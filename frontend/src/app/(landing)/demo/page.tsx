"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@nextui-org/react";
import { SparklesIcon } from "hugeicons-react";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 py-24 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center text-center space-y-8 mb-20">
          <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2}}
          className={` bg-purple-200 text-purple-800 border border-purple-300 rounded-full text-xs font-semibold px-3 py-1 inline-block`}
        >
          <SparklesIcon className="h-4 w-4 inline-block mr-1" />
          Smart File Categorization
        </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className=" capitalize relative inline-block py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient">
                1 Minute <br/> to Clean Your Mess!
              </span>
            </h1>
            <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </motion.div>
        </div>

        {/* Demo Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative px-4 z-10"
        >
          <Card className="overflow-hidden border border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm w-full max-w-4xl mx-auto hover:shadow-primary/5 transition-all duration-500">
            <div className="aspect-video relative bg-background rounded-lg overflow-hidden">
              <div className="relative w-full h-full group">
                <Image
                  width={1920}
                  height={1080}
                  src="https://res.cloudinary.com/decb9vsza/image/upload/v1736871887/orgafile-demo_xt6yom.gif"
                  alt="File Organization Demo"
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

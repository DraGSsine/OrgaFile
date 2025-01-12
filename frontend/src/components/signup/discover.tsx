"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { File01Icon, PlayCircleIcon, Watch01Icon } from "hugeicons-react";
import { Logo } from "../dashboard/sidebar/logo";
const Discover = () => {
  return (
    <div className="hidden sm:flex h-full w-[50%] lg:w-[40%] bg-gradient-to-br to-[#0162ff15] from-[#a955f70f] rounded-lg p-12 relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20 backdrop-blur-[1px]" />
      
      <div className="relative max-w-xl mx-auto flex gap-14 flex-col">
        {/* Logo */}
        <Logo width={200} height={100} alt="Orgafile logo for the signup" />
        
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            Let AI organize your files{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              automatically
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            Upload your documents and watch as our AI instantly categorizes them into 
            perfect folders. From business reports to personal files, our smart system 
            knows exactly where everything belongs.
          </p>

          <div className="flex gap-4">
            <Button startContent={<PlayCircleIcon/>} size="lg" className="rounded-full text-white bg-black ">
              <Link href="/demo">
                Watch demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
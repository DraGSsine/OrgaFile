"use client";

import { Card } from "@nextui-org/react";
import {
  BarCode02Icon,
  File02Icon,
  PlayCircle02Icon,
  SparklesIcon,
} from "hugeicons-react";
import React, { useState } from "react";

export default function DemoPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Smart AI",
      description: "Watch how our AI instantly categorizes your files",
      icon: SparklesIcon,
    },
    {
      title: "Clean Code",
      description: "Built with modern tech stack for optimal performance",
      icon: BarCode02Icon,
    },
    {
      title: "Easy Export",
      description: "Export your organized files with one click",
      icon: File02Icon,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <SparklesIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">See the magic in action</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Experience the Future
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg">
            Watch how our AI-powered system transforms chaotic file structures
            into perfectly organized categories in seconds
          </p>
        </div>

        {/* Main Demo Section */}
        <div className="flex items-center justify-center">
          {/* Video Card */}
          <Card className="overflow-hidden border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
            <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
              <video
                src="https://cdn.loom.com/sessions/thumbnails/c9b25756cad9411493548cc087a975f1-ab25417174a52a16.mp4"
                playsInline
                loop
                autoPlay
                poster="https://cdn.loom.com/sessions/thumbnails/c9b25756cad9411493548cc087a975f1-ab25417174a52a16.jpg"
              ></video>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

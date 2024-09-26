"use client";
import Features from "@/components/features/Features";
import FooterBar from "@/components/footerBar/FooterBar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/howItWorks/HowItWork";
import NewsLetter from "@/components/newsLetter/NewsLetter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <NewsLetter />
      <FooterBar />
    </main>
  );
}

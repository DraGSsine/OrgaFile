import Features from "@/components/features/Features";
import FooterBar from "@/components/footerBar/FooterBar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/howItWorks/HowItWork";
import NavBar from "@/components/NavBar";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import Image from "next/image";

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

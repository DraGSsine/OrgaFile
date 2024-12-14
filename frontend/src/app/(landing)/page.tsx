import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Features from "@/components/features/Features";
import FooterBar from "@/components/footerBar/FooterBar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/howItWorks/HowItWork";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import { cookies } from "next/headers";

export default async function Home() {
  console.log("cookies from the front",await cookies())
  return (
    <>
      <MaxWidthWrapper>
        <Hero />
        <Features />
        <HowItWorks />
      </MaxWidthWrapper>
      <NewsLetter />
      <FooterBar />
    </>
  );
}

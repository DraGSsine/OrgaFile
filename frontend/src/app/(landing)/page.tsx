import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Features from "@/components/features/Features";
import FooterBar from "@/components/footerBar/FooterBar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/howItWorks/HowItWork";

export default async function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <Hero />
        <Features />
        <HowItWorks />
      </MaxWidthWrapper>
      {/* <NewsLetter /> */}
      <FooterBar />
    </>
  );
}

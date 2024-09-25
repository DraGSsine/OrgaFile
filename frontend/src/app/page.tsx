"use client";
import Features from "@/components/features/Features";
import FooterBar from "@/components/footerBar/FooterBar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/howItWorks/HowItWork";
import NavBar from "@/components/NavBar";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const fetchTest = async () => {
    try {
      const data = await axios.post("https://doctify-m1igesmgd-dragssines-projects.vercel.app/api/tests",{})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTest();
  }), [];
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

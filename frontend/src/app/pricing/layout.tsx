import NavBar from "@/components/NavBar";
import { Navbar } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleeso",
  description: "fleeso a way to Generate things",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <NavBar/>
        {children}
    </section>
  );
}

import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/Provider";
const inter = Inter({weight: [ "100" ,"200" ,"300" ,"400","500" , "600"],subsets: ["vietnamese"]});

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
    </html>
  );
}

import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrgaFile",
  description: "OrgaFile is a file management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="module"
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs"
        ></Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs"
          type="module"
        ></Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

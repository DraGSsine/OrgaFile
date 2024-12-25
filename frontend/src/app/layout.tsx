import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

import { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OrgaFile",
    template: "OrgaFile | %s",
  },
  description: "OrgaFile is the ultimate AI-powered file organizer. Simplify file management with smart categorization, renaming, and secure cloud storage.",
  keywords: "file organizer, file management, AI file management, file categorization, AI file organizer",
  openGraph: {
    title: "OrgaFile",
    description: "Smart AI-driven file categorization and management.",
    url: "https://orgafile.com",
    images: [
      {
        url: "/images/dashboard.png",
        width: 1200,
        height: 630,
        alt: "OrgaFile dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrgaFile",
    description: "Smart AI-driven file categorization and management.",
    images: ["/images/dashboard.png"],
  },
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={inter.className}>
      <NavBar />
      {children}
    </main>
  );
}
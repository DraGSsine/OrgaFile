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
  description: "OrgaFile is a file management system.",
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
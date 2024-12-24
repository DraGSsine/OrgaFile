import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Provider";

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
        <script
          defer
          data-website-id="676a4cee05bd20b105796fbc"
          data-domain="orgafile.com"
          src="https://datafa.st/js/script.js"
        ></script>
      </body>
    </html>
  );
}

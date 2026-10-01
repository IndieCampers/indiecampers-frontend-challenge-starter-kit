import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "indie campers – Find your campervan",
  description: "Frontend challenge starter kit",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, geistMono.variable)}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}

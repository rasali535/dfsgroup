import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalChatbot } from "@/components/GlobalChatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DFS Group | Premium Logistics, Customs & Freight Forwarding",
  description: "Moving Cargo Across Borders With Confidence. DFS Group is the premier digital operations system and regional logistics network across Southern Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dfs-light text-dfs-dark antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col bg-white">
          {children}
        </main>
        <Footer />
        <GlobalChatbot />
      </body>
    </html>
  );
}

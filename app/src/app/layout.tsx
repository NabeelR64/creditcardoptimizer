import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/sidebar";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CardCopilot — Credit Card Optimization",
  description:
    "Maximize your credit card rewards. AI-powered recommendations, offer tracking, and spending optimization across your entire card portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex">
        <Providers>
          <TooltipProvider delay={200}>
            <Sidebar />
            <main className="flex-1 min-h-screen overflow-y-auto custom-scrollbar">
              {children}
            </main>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}

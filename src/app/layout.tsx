import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../Fonts/Inter_18pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../Fonts/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synergy PUF | Engineering Insulation Solutions",
  description: "India's premier manufacturer of high-density PUF panels, thermal cold storage solutions, and energy-efficient sandwich roofing systems.",
  keywords: ["PUF Panels", "Cold Storage Insulation", "Roofing Panels", "Cleanroom Panels", "Synergy PUF"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

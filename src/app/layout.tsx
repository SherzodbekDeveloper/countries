import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "../provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Where in the World? - Explore Countries & Continents",
  description: "Discover countries and continents with detailed information, maps, and more. Search and filter by region easily!",
  keywords: "countries, world map, continents, country search, travel, geography, nations, flags",
  openGraph: {
    title: "Where in the World?",
    description: "Find detailed information about countries and continents. Search, filter, and explore!",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://c4.wallpaperflare.com/wallpaper/123/312/5/earth-the-blue-planet-view-from-moon-north-and-south-america-ultra-hd-4k-wallpapers-for-desktop-mobiles-3840%C3%972160-wallpaper-preview.jpg",
        height: 630,
        alt: "Where in the World - Country Explorer",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

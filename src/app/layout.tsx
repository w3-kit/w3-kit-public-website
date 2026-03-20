import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://w3-kit.com"),
  title: {
    default: "Web3 UI Component Library | W3-Kit",
    template: "%s | W3-Kit",
  },
  description:
    "A modern, accessible UI component library for Web3 applications",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Web3 UI Component Library | W3-Kit",
    description:
      "A modern, accessible UI component library for Web3 applications",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit - Web3 UI Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "PLACEHOLDER_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light scroll-smooth">
    <body
        className={`${GeistSans.className} antialiased bg-white dark:bg-gray-950`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />

        </ThemeProvider>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

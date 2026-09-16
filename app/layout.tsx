import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./global.css";
import { SITE_NAME } from "@/lib/constants";
import { SITE_DESCRIPTION } from "@/lib/constants";
import React from "react";

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";
const isAdSenseConfigured =
  ADSENSE_PUB_ID.startsWith("ca-pub-") &&
  ADSENSE_PUB_ID !== "ca-pub-2081905719548415";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // CLS: mencegah layout shift saat font loading
  preload: false, // tidak download saat build, dimuat saat runtime
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: {
<<<<<<< HEAD
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Berita Terkini & Terpercaya`,
=======
    template: "%s | BeritaUpToDate",
    default: "BeritaUpToDate — Berita Terkini & Terpercaya",
>>>>>>> 41fc9f56035bb0386faf87930ed33ac97cfe0181
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
<<<<<<< HEAD
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Berita Terkini & Terpercaya`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Berita Terkini & Terpercaya`,
    description: SITE_DESCRIPTION,
=======
    siteName: "BeritaUpToDate",
    title: "BeritaUpToDate — Berita Terkini & Terpercaya",
    description: "Portal berita terkini dan terpercaya dari berbagai kategori",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeritaUpToDate — Berita Terkini & Terpercaya",
    description: "Portal berita terkini dan terpercaya dari berbagai kategori",
>>>>>>> 41fc9f56035bb0386faf87930ed33ac97cfe0181
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        {/* Google AdSense — hanya load jika Publisher ID sudah dikonfigurasi */}
        {isAdSenseConfigured && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

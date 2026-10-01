import type { Metadata, Viewport } from "next";
import { Inter, Spectral } from "next/font/google";

import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";
import { institution } from "@/data/institution";
import {
  defaultDescription,
  defaultKeywords,
  homeTitle,
  siteUrl,
} from "@/data/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-spectral",
  display: "swap",
});

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ??
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | CMEBE",
  },
  description: defaultDescription,
  applicationName: institution.shortName,
  keywords: defaultKeywords,
  authors: [{ name: institution.fullName, url: siteUrl }],
  creator: institution.fullName,
  publisher: institution.fullName,
  category: "Organização religiosa",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: defaultDescription,
    url: "/",
    siteName: institution.shortName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: homeTitle,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0c2348",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${inter.variable} ${spectral.variable}`}
    >
      <body>
        {children}
        <FloatingWhatsapp />
      </body>
    </html>
  );
}

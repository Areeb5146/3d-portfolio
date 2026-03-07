import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://areeb-afzal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Areeb Afzal — Frontend Engineer | WebGL, Three.js, Fabric.js",
  description:
    "Areeb Afzal is a Frontend Engineer specializing in WebGL, Three.js, Fabric.js, and 3D web interfaces. Top Rated on Upwork with 100% Job Success Score. Based in Rawalpindi, Pakistan.",
  keywords: [
    "Areeb Afzal",
    "Frontend Engineer",
    "WebGL",
    "Three.js",
    "Fabric.js",
    "React",
    "Next.js",
    "TypeScript",
    "3D Web Developer",
    "Canvas Developer",
    "Upwork Top Rated",
  ],
  authors: [{ name: "Areeb Afzal", url: SITE_URL }],
  creator: "Areeb Afzal",
  openGraph: {
    title: "Areeb Afzal — Frontend Engineer",
    description:
      "Frontend Engineer specializing in WebGL, Three.js, and 3D web interfaces. Top Rated on Upwork.",
    url: SITE_URL,
    siteName: "Areeb Afzal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Areeb Afzal — Frontend Engineer",
    description:
      "Frontend Engineer specializing in WebGL, Three.js, and 3D web interfaces.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Areeb Afzal",
  url: SITE_URL,
  jobTitle: "Frontend Engineer",
  description:
    "Frontend Engineer specializing in WebGL, Three.js, Fabric.js, and 3D web interfaces.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rawalpindi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/areebafzal",
    "https://linkedin.com/in/areebafzal",
    "https://www.upwork.com/freelancers/areebafzal",
  ],
  knowsAbout: [
    "WebGL",
    "Three.js",
    "Fabric.js",
    "React",
    "Next.js",
    "TypeScript",
    "Angular",
    "GSAP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

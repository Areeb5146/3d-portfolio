import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Areeb Afzal — Frontend Engineer",
  description:
    "Frontend Engineer specializing in WebGL, Canvas, and 3D interfaces. Building immersive web experiences with Three.js, Fabric.js, and modern frameworks.",
  keywords: [
    "Frontend Engineer",
    "WebGL",
    "Three.js",
    "Fabric.js",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Areeb Afzal — Frontend Engineer",
    description:
      "Building immersive web experiences with WebGL, Canvas, and 3D interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

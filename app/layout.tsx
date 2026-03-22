import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Scene from "@/components/Scene";
import AccessibilityMenu from "@/components/AccessibilityMenu";

export const metadata: Metadata = {
  title: "Ashutosh Ahirwal — Senior Drupal Frontend Developer",
  description: "Portfolio of Ashutosh Ahirwal, an accomplished Senior Drupal Frontend Developer with 5+ years of expertise in Drupal, Twig, SDC, and Layout Builder.",
  keywords: ["Drupal", "Frontend Developer", "Ashutosh Ahirwal", "React", "Next.js", "SDC", "Storybook", "Tailwind CSS"],
  authors: [{ name: "Ashutosh Ahirwal" }],
  openGraph: {
    title: "Ashutosh Ahirwal — Senior Drupal Frontend Developer",
    description: "Senior Drupal Frontend Developer with 5+ years crafting enterprise digital experiences.",
    url: "https://ashutoshahirwal.com",
    siteName: "Ashutosh Ahirwal Portfolio",
    locale: "en_US",
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
      <body>
        <Cursor />
        <Scene />
        <AccessibilityMenu />
        {children}
      </body>
    </html>
  );
}

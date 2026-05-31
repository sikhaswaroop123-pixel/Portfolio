import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HashScroll } from "@/components/layout/HashScroll";
import { Nav } from "@/components/layout/Nav";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <SmoothScroll>
          <HashScroll />
          <CustomCursor />
          <Nav />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}

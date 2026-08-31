import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zenji-archive.com"),
  title: {
    default: "ZENJI // Underground Anime Streetwear",
    template: "%s | ZENJI (ゼンジ)",
  },
  description: "High-specification dystopian anime streetwear engineered with 320–520 GSM heavyweight textiles, Japanese calligraphy, and cybernetic anime culture. No restocks. Ever.",
  keywords: [
    "ZENJI",
    "anime streetwear",
    "japanese graphic tees",
    "cyberpunk fashion",
    "heavyweight hoodie",
    "demon blood tee",
    "blue flame tee",
    "domain expansion tee",
    "DROP 001",
  ],
  authors: [{ name: "ZENJI // TOKYO & AUSTRALIA" }],
  creator: "ZENJI APPAREL RESEARCH CORP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenji-archive.com",
    siteName: "ZENJI (ゼンジ)",
    title: "ZENJI // Wear Your Story — Anime Streetwear",
    description: "Limited anime streetwear. Japanese-inspired heavyweight graphic tees & hoodies. No restocks. Ever.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "ZENJI Drop 001 Anime Streetwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZENJI // Underground Anime Streetwear",
    description: "Limited anime streetwear. Japanese-inspired heavyweight graphic tees. No restocks. Ever.",
    images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85"],
    creator: "@zenji_shop",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian text-cyber-white min-h-screen antialiased selection:bg-crimson selection:text-white font-sans overflow-x-hidden pb-16 md:pb-0 flex flex-col cursor-default">
        {/* Interactive Magnetic Cyberpunk Cursor */}
        <CustomCursor />

        {/* Smooth Inertia Scrolling Physics */}
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
          
          {/* Global Slide-Over Cart Drawer */}
          <CartDrawer />

          {/* Mobile Bottom Bar */}
          <MobileBottomBar />
        </SmoothScroll>
      </body>
    </html>
  );
}

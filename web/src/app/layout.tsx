import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { CalendlyEvents } from "@/components/CalendlyEvents";

// Display face (H1, H2, card titles, wordmark) — Playfair Display.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

// Label face — Montserrat, used only for small uppercase letter-spaced
// micro-copy: SectionLabel, button labels, nav items, lightbox counter.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

// Body face — Inter, all paragraphs / descriptions / captions.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Aibrium Studio — Exclusive On-Model Visuals for Fashion & Lifestyle Brands, Weekly",
  description:
    "We cast exclusive digital models for your brand and deliver campaign-quality on-model product visuals every week. No photoshoots. Start with a $900 pilot.",
  metadataBase: new URL("https://aibrium.com"),
  alternates: { canonical: "https://aibrium.com" },
  openGraph: {
    title: "Aibrium Studio — Exclusive On-Model Visuals, Weekly",
    description:
      "Exclusive digital models cast for your brand. Campaign-quality on-model visuals every week.",
    url: "https://aibrium.com",
    siteName: "Aibrium Studio",
    images: ["/og.jpg"], // = hero visual (pending real asset)
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
      className={`${playfair.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <CalendlyProvider>
          <MotionProvider>
            <Header />
            {children}
            <Footer />
          </MotionProvider>
        </CalendlyProvider>

        <CalendlyEvents />

        {/* Calendly widget — deferred so it never blocks render */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />

        {/* Plausible analytics — cookieless, deferred */}
        <Script
          defer
          data-domain="aibrium.com"
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

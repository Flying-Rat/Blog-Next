import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConsoleEasterEgg } from "./components/blog/ConsoleEasterEgg";
import { ScrollProgress } from "./components/blog/ScrollProgress";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./i18n/client";
import { fallbackLng } from "./i18n/settings";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Flying Rat Tech Blog",
    default: "Tech Blog | Flying Rat Studio",
  },
  description:
    "Game development insights, tutorials, and technical deep dives from Flying Rat Studio. Covering Unreal Engine, Unity, Godot, and more.",
  keywords: [
    "game development",
    "game programming",
    "Unreal Engine",
    "Unity",
    "Godot",
    "Flying Rat",
    "tech blog",
  ],
  authors: [{ name: "Flying Rat Studio" }],
  openGraph: {
    title: "Tech Blog | Flying Rat Studio",
    description: "Game development insights, tutorials, and technical deep dives.",
    url: "https://tech.flying-rat.studio",
    siteName: "Flying Rat Tech Blog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Flying Rat Studio",
    description: "Game development insights, tutorials, and technical deep dives.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={fallbackLng}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased transition-colors">
        <ThemeProvider>
          <I18nProvider>
            <ScrollProgress />
            <ConsoleEasterEgg />
            {children}
            <Analytics />
            <SpeedInsights />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConsoleEasterEgg } from "./components/blog/ConsoleEasterEgg";
import { ScrollProgress } from "./components/blog/ScrollProgress";
import { getTranslations } from "./i18n/server";

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

const themeScript = `(function(){var t=localStorage.getItem('theme');document.documentElement.classList.add(t&&t!=='system'?t:matchMedia('(prefers-color-scheme:light)').matches?'light':'dark')})()`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { language } = await getTranslations();

  return (
    <html
      lang={language}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Required for FOUC prevention */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased transition-colors">
        <ScrollProgress />
        <ConsoleEasterEgg />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

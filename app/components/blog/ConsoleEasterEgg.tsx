"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const accent = "#fa5565";
    const muted = "color: #9ca3af;";
    const base = "font-family: ui-sans-serif, system-ui; color: #e5e7eb;";
    const highlight = "color: #fbbf24;font-weight:700;";
    const highlightAlt = "color: #22d3ee;font-weight:700;";

    const message =
      "%cHey, curious mind!%c\nNothing secret here - the whole blog is open source on GitHub: https://github.com/Flying-Rat/Blog-Next%c\nStack: Next.js, React, TypeScript, TailwindCSS, and friends.%c\nWe build game tech in %cC++%c, %cC#%c, %cRust%c, %cZig%c, %cOdin%c, and %cGo%c, running inside %cUnreal%c, %cUnity%c, and %cGodot%c when it makes sense.%c\nWe care about peak performance - %cGPU%c, %cCPU%c, the whole pipeline.%c\nAnd yes, AI - no mindless hype. We build internal models to help us hit our goals.\n%cIf any of this clicks, drop a note to marty@flying-rat.studio";

    const styles = [
      `font-size:20px;font-weight:700;color:${accent};${base}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlightAlt}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlightAlt}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlightAlt}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${highlight}`,
      `font-size:12px;${muted}`,
      `font-size:12px;${muted}`,
      `font-size:12px;font-weight:600;color:${accent};`,
    ];

    // eslint-disable-next-line no-console
    console.log(message, ...styles);
  }, []);

  return null;
}

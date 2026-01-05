"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function getScrollProgress() {
  const docEl = document.documentElement;
  const body = document.body;
  const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop || 0;
  const scrollHeight = Math.max(docEl.scrollHeight, body.scrollHeight);
  const maxScroll = Math.max(0, scrollHeight - window.innerHeight);
  if (maxScroll === 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, scrollTop / maxScroll));
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);
  const pathname = usePathname();
  const isPostRoute = pathname?.startsWith("/post/");

  useEffect(() => {
    if (!isPostRoute) {
      return;
    }
    const update = () => {
      frame.current = null;
      setProgress(getScrollProgress());
    };

    const requestUpdate = () => {
      if (frame.current !== null) {
        return;
      }
      frame.current = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("orientationchange", requestUpdate, { passive: true });
    window.addEventListener("load", requestUpdate);
    const timeout = window.setTimeout(requestUpdate, 0);
    const delayed = window.setTimeout(requestUpdate, 120);

    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      window.clearTimeout(timeout);
      window.clearTimeout(delayed);
    };
  }, [isPostRoute]);

  if (!isPostRoute) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
      <div
        className="scroll-progress-bar h-full bg-[var(--color-accent)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

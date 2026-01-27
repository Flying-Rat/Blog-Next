"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "../../i18n/client";

export function ReadingAssist() {
  const { t } = useTranslations();
  const [showTop, setShowTop] = useState(false);
  const _pathname = usePathname();

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id], article h4[id]"),
    );
    const tocLinks = Array.from(document.querySelectorAll<HTMLElement>("[data-toc-link]"));
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const offset = 140;
      const scrollY = window.scrollY;
      let activeId = "";

      for (const heading of headings) {
        if (heading.offsetTop - offset <= scrollY) {
          activeId = heading.id;
        } else {
          break;
        }
      }

      for (const link of tocLinks) {
        const isActive = link.dataset.tocId === activeId && activeId.length > 0;
        if (isActive) {
          link.dataset.active = "true";
          link.setAttribute("aria-current", "true");
        } else {
          delete link.dataset.active;
          link.removeAttribute("aria-current");
        }
      }

      const scrollingElement = document.scrollingElement || document.documentElement;
      const maxScroll = Math.max(0, scrollingElement.scrollHeight - scrollingElement.clientHeight);
      setShowTop(maxScroll > 0 && scrollY / maxScroll > 0.3);
    };

    const requestUpdate = () => {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  if (!showTop) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="scroll-top-btn fixed bottom-6 right-6 z-50 glass-subtle border border-[var(--color-border)]/40 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-all duration-300 px-3 py-2 rounded-full text-sm"
      aria-label={t("post.scrollTopLabel")}
    >
      {t("post.scrollTop")}
    </button>
  );
}

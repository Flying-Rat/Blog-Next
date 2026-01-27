"use client";

import { useTranslations } from "../../i18n/client";
import type { TocItem } from "../../lib/blog-types";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const { t } = useTranslations();

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="hidden lg:block glass-card border border-[var(--color-border)]/40 rounded-xl p-5">
        <p className="text-sm font-semibold tracking-wide text-[var(--color-text)] mb-3">
          {t("post.onThisPage")}
        </p>
        <nav className="space-y-2 text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-toc-link
              data-toc-id={item.id}
              className={`toc-link block transition-colors hover:text-[var(--color-accent)] ${
                item.depth === 3
                  ? "pl-3 text-[var(--color-text-muted)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <details className="lg:hidden glass-card border border-[var(--color-border)]/40 rounded-xl p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--color-text)]">
          {t("post.onThisPage")}
        </summary>
        <nav className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-toc-link
              data-toc-id={item.id}
              className={`toc-link block transition-colors hover:text-[var(--color-accent)] ${
                item.depth === 3
                  ? "pl-3 text-[var(--color-text-muted)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </details>
    </aside>
  );
}

"use client";

import { useTranslations } from "../../i18n/client";
import { BrandLogo } from "./BrandLogo";

export function BlogFooter() {
  const { t } = useTranslations();
  const year = new Date().getFullYear();
  const logoAlt = t("brand.logoAlt");

  return (
    <footer className="py-8 border-t border-[var(--color-border)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandLogo width={120} height={30} className="h-6 opacity-70" alt={logoAlt} />
            <span className="text-[var(--color-text-muted)] text-sm">
              © {year} {t("footer.rights")}
            </span>
            <a
              href="https://flying-rat.studio"
              rel="nofollow noopener"
              className="text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                {t("footer.studioSite")}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5h5m0 0v5m0-5L10 14"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 9v10a1 1 0 001 1h10"
                  />
                </svg>
              </span>
            </a>
          </div>
          <p className="text-[var(--color-text-subtle)] text-sm">{t("footer.cookies")}</p>
        </div>
      </div>
    </footer>
  );
}

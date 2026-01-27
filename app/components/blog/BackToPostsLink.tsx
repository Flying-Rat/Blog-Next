"use client";

import Link from "next/link";
import { useTranslations } from "../../i18n/client";

export function BackToPostsLink() {
  const { t } = useTranslations();

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-8 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>{t("post.backToAll")}</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {t("post.backToAll")}
    </Link>
  );
}

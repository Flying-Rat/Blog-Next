"use client";

import { useTranslations } from "../../i18n/client";
import type { Language } from "../../i18n/settings";

export function LanguageToggle() {
  const { t, language, setLanguage } = useTranslations();
  const nextLanguage: Language = language === "en" ? "cs" : "en";
  const languageLabels: Record<Language, string> = {
    en: t("header.languageLabels.en"),
    cs: t("header.languageLabels.cs"),
  };

  const handleToggle = () => {
    setLanguage(nextLanguage);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center justify-center h-9 px-3 text-xs font-semibold rounded-lg transition-all duration-300 glass-subtle text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 hover:shadow-sm hover:shadow-[var(--color-accent)]/10 sm:text-sm"
      aria-label={t("header.toggleLanguage")}
    >
      {languageLabels[language]}
    </button>
  );
}

"use client";

import { useTheme } from "../../hooks/useTheme";
import { useTranslations } from "../../i18n/client";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  const { t } = useTranslations();
  const lightLabel = t("header.lightMode");
  const darkLabel = t("header.darkMode");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-300 glass-subtle border border-transparent hover:border-[var(--color-border)]/30 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:shadow-sm"
      aria-label={t("header.toggleTheme")}
    >
      {mounted &&
        (resolvedTheme === "dark" ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>{lightLabel}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>{darkLabel}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ))}
    </button>
  );
}

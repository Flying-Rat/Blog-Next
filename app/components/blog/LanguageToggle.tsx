"use client";

import { useRouter } from "next/navigation";
import type { Language } from "../../i18n/settings";

interface LanguageToggleProps {
  currentLabel: string;
  nextLanguage: Language;
  ariaLabel: string;
}

export function LanguageToggle({ currentLabel, nextLanguage, ariaLabel }: LanguageToggleProps) {
  const router = useRouter();

  const handleToggle = async () => {
    await fetch("/api/language", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lng: nextLanguage }),
    });
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 glass-subtle text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 hover:shadow-sm hover:shadow-[var(--color-accent)]/10"
      aria-label={ariaLabel}
    >
      {currentLabel}
    </button>
  );
}

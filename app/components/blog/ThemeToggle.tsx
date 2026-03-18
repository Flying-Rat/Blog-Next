"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useTranslations } from "../../i18n/client";

type ThemeOption = "light" | "dark" | "system";

const CYCLE: ThemeOption[] = ["light", "dark", "system"];

function SunIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const ICONS: Record<ThemeOption, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <MonitorIcon />,
};

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { t } = useTranslations();

  const current = (theme as ThemeOption | undefined) ?? "system";
  const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

  const labels: Record<ThemeOption, string> = {
    light: t("header.lightMode"),
    dark: t("header.darkMode"),
    system: t("header.systemMode"),
  };

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="p-2 rounded-lg transition-all duration-300 glass-subtle border border-transparent hover:border-[var(--color-border)]/30 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:shadow-sm"
      aria-label={mounted ? labels[current] : t("header.toggleTheme")}
      title={mounted ? labels[current] : undefined}
    >
      {mounted ? ICONS[current] : <span className="w-5 h-5 block" aria-hidden="true" />}
    </button>
  );
}

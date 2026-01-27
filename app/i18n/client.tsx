"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import cs from "../locales/cs.json";
import en from "../locales/en.json";
import { fallbackLng, type Language, languages } from "./settings";

const dictionaries = { en, cs } as const;
const STORAGE_KEY = "fr:blog:language";

function resolveTranslation(dictionary: typeof en, key: string): string {
  const parts = key.split(".");
  let value: unknown = dictionary;
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}

function readStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return fallbackLng;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && languages.includes(stored as Language)) {
    return stored as Language;
  }
  return fallbackLng;
}

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(fallbackLng);

  useEffect(() => {
    const initial = readStoredLanguage();
    if (initial !== language) {
      setLanguageState(initial);
    }
  }, [language]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const dictionary = useMemo(() => dictionaries[language] ?? dictionaries[fallbackLng], [language]);

  const t = useCallback((key: string) => resolveTranslation(dictionary, key), [dictionary]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslations must be used within I18nProvider");
  }
  return context;
}

export function I18nText({ k }: { k: string }) {
  const { t } = useTranslations();
  return t(k);
}

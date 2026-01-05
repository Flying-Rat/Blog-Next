import { cookies } from "next/headers";
import cs from "../locales/cs.json";
import en from "../locales/en.json";
import { fallbackLng, type Language, languages } from "./settings";

const dictionaries = { en, cs } as const;

async function getLanguageFromCookies(): Promise<Language> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("i18nextLng")?.value;
  if (cookie && languages.includes(cookie as Language)) {
    return cookie as Language;
  }
  return fallbackLng;
}

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

export async function getTranslations() {
  const language = await getLanguageFromCookies();
  const dictionary = dictionaries[language] ?? dictionaries[fallbackLng];
  return {
    language,
    t: (key: string) => resolveTranslation(dictionary, key),
  };
}

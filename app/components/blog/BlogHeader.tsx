import Link from "next/link";
import { getTranslations } from "../../i18n/server";
import type { Language } from "../../i18n/settings";
import { BrandLogo } from "./BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export async function BlogHeader() {
  const { t, language } = await getTranslations();
  const languageLabels: Record<Language, string> = {
    en: t("header.languageLabels.en"),
    cs: t("header.languageLabels.cs"),
  };
  const nextLanguage: Language = language === "en" ? "cs" : "en";

  const logoAlt = t("brand.logoAlt");

  return (
    <header className="sticky top-0 z-50 glass py-4">
      <div className="container mx-auto px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:justify-start">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90"
          >
            <BrandLogo width={140} height={35} className="h-8" priority alt={logoAlt} />
            <span className="hidden sm:inline-block text-[var(--color-text-muted)] text-sm border-l border-[var(--color-border)] pl-3 ml-1 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
              {t("header.techBlog")}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="/feed.xml"
              className="p-2 rounded-lg transition-all duration-300 glass-subtle border border-transparent hover:border-[var(--color-border)]/30 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:shadow-sm"
              aria-label={t("header.rssFeed")}
              title={t("header.rssFeed")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <title>{t("header.rssFeed")}</title>
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
              </svg>
            </a>
            <LanguageToggle
              currentLabel={languageLabels[language]}
              nextLanguage={nextLanguage}
              ariaLabel={t("header.toggleLanguage")}
            />
            <ThemeToggle
              lightLabel={t("header.lightMode")}
              darkLabel={t("header.darkMode")}
              ariaLabel={t("header.toggleTheme")}
            />
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-4 justify-end">
          <a
            href="/feed.xml"
            className="p-2 rounded-lg transition-all duration-300 glass-subtle border border-transparent hover:border-[var(--color-border)]/30 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:shadow-sm"
            aria-label={t("header.rssFeed")}
            title={t("header.rssFeed")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <title>{t("header.rssFeed")}</title>
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
            </svg>
          </a>
          <LanguageToggle
            currentLabel={languageLabels[language]}
            nextLanguage={nextLanguage}
            ariaLabel={t("header.toggleLanguage")}
          />
          <ThemeToggle
            lightLabel={t("header.lightMode")}
            darkLabel={t("header.darkMode")}
            ariaLabel={t("header.toggleTheme")}
          />
        </nav>
      </div>
    </header>
  );
}

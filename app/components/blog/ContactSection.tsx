"use client";

import Image from "next/image";
import { useTranslations } from "../../i18n/client";
import { MailIcon, socialLinks } from "../icons/SocialIcons";

export function ContactSection() {
  const { t } = useTranslations();
  const socialLabels: Record<string, string> = {
    github: t("contact.social.github"),
    discord: t("contact.social.discord"),
    x: t("contact.social.x"),
    youtube: t("contact.social.youtube"),
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden border-t border-[var(--color-accent)]/20">
      <div className="absolute inset-0">
        <div className="reduce-motion-gradient absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/3 to-[var(--color-accent)]/8" />
        <div className="reduce-motion-gradient absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/6 to-transparent" />
        <div className="reduce-motion-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-transparent">
            {t("contact.title")}
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto">
            {t("contact.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Image
                src="/images/marty.png"
                alt={t("contact.martyName")}
                width={56}
                height={56}
                className="rounded-full ring-2 ring-[var(--color-accent)]/40 ring-offset-2 ring-offset-[var(--color-bg)]"
              />
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--color-bg)]"
                title={t("contact.available")}
              />
            </div>
            <a
              href="mailto:marty@flying-rat.studio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] hover:from-[var(--color-accent-dark)] hover:to-[var(--color-accent)] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-accent)]/40"
            >
              <MailIcon className="w-5 h-5" />
              {t("contact.emailMarty")}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[var(--color-text-muted)] text-sm">{t("contact.findUsOn")}</span>
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-10 h-10 glass-subtle border border-[var(--color-border)]/30 hover:border-[var(--color-accent)]/40 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-[var(--color-accent)]/20 group"
                title={socialLabels[link.id] ?? link.id}
                aria-label={socialLabels[link.id] ?? link.id}
              >
                <link.Icon className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300" />
              </a>
            ))}
            <a
              href="https://x.com/search?q=%23flyingWithRats"
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={t("contact.hashTagLabel")}
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors font-medium text-sm"
            >
              {t("contact.hashTag")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

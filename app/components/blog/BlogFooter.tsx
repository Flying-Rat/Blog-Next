import { getTranslations } from "../../i18n/server";
import { BrandLogo } from "./BrandLogo";

export async function BlogFooter() {
  const { t } = await getTranslations();
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
          </div>
          <p className="text-[var(--color-text-subtle)] text-sm">{t("footer.cookies")}</p>
        </div>
      </div>
    </footer>
  );
}

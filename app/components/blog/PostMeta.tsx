import { getTranslations } from "../../i18n/server";
import { formatDate } from "../../lib/blog-utils";

interface PostMetaProps {
  date: string;
  readingTime: number;
  authors: string[];
}

export async function PostMeta({ date, readingTime, authors }: PostMetaProps) {
  const { t } = await getTranslations();

  return (
    <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
      <time dateTime={date}>{formatDate(date)}</time>
      <span className="opacity-50">•</span>
      <span>
        {readingTime} {t("home.minRead")}
      </span>
      {authors.length > 0 && (
        <>
          <span className="opacity-50">•</span>
          <span>{authors.join(", ")}</span>
        </>
      )}
    </div>
  );
}

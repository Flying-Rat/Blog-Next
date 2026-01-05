import type { Metadata } from "next";
import { BlogFooter } from "../components/blog/BlogFooter";
import { BlogHeader } from "../components/blog/BlogHeader";
import { ReadingAssist } from "../components/blog/ReadingAssist";
import { getTranslations } from "../i18n/server";

export const metadata: Metadata = {
  title: {
    template: "%s | Flying Rat Tech Blog",
    default: "Tech Blog | Flying Rat Studio",
  },
  description:
    "Game development insights, tutorials, and technical deep-dives from Flying Rat Studio.",
};

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingAssist label={t("post.scrollTop")} ariaLabel={t("post.scrollTopLabel")} />
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}

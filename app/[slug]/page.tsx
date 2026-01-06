import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToPostsLink } from "../components/blog/BackToPostsLink";
import { ContactSection } from "../components/blog/ContactSection";
import { CopyCodeButton } from "../components/blog/CopyCodeButton";
import { HeadingLinks } from "../components/blog/HeadingLinks";
import { PostMeta } from "../components/blog/PostMeta";
import { TableOfContents } from "../components/blog/TableOfContents";
import { getTranslations } from "../i18n/server";
import {
  formatDate,
  getAllFullSlugs,
  getAllPosts,
  getAuthors,
  getFullSlug,
  getPostByPath,
  getRelatedPosts,
} from "../lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://tech.flying-rat.studio";
const DEFAULT_OG_IMAGE = `${SITE_URL}/fr_horizontal_black.png`;

export async function generateStaticParams() {
  const slugs = getAllFullSlugs();
  return slugs.map((slug) => ({ slug }));
}

function resolveOgImage(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  if (src.startsWith("//")) {
    return `https:${src}`;
  }
  if (src.startsWith("/")) {
    return `${SITE_URL}${src}`;
  }
  return `${SITE_URL}/${src}`;
}

function extractFirstImage(content: string) {
  const markdownMatch = content.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g).next().value;
  const htmlMatch = content.matchAll(/<img[^>]*\s+src=["']([^"']+)["'][^>]*>/gi).next().value;

  if (markdownMatch && htmlMatch) {
    return markdownMatch.index <= htmlMatch.index ? markdownMatch[1] : htmlMatch[1];
  }

  return markdownMatch?.[1] ?? htmlMatch?.[1] ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostByPath(slug);

  if (!post) {
    const { t } = await getTranslations();
    return { title: t("post.notFound") };
  }

  const url = `${SITE_URL}/${getFullSlug(post)}`;
  const image = resolveOgImage(extractFirstImage(post.content) ?? DEFAULT_OG_IMAGE);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Flying Rat Tech Blog",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: getAuthors(post),
      tags: post.tags,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostByPath(slug);

  if (!post) {
    notFound();
  }

  const { t } = await getTranslations();
  const authors = getAuthors(post);
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((item) => item.slug === post.slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <BackToPostsLink />

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
            <div>
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-accent)] text-white"
                    >
                      {category}
                    </Link>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

                <PostMeta date={post.date} readingTime={post.readingTime} authors={authors} />
              </header>

              <div
                className="prose prose-lg dark:prose-invert max-w-[68ch]
                  prose-headings:font-semibold prose-headings:text-[var(--color-text)]
                  prose-h1:text-3xl prose-h1:mb-4
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                  prose-p:text-[var(--color-text-secondary)] prose-p:leading-[1.9] prose-p:my-5
                  prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[var(--color-text)]
                  prose-code:text-sm prose-code:font-mono
                  prose-pre:p-0 prose-pre:bg-transparent prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-xl prose-pre:overflow-hidden
                  [&_pre_code]:block [&_pre_code]:p-4 [&_pre_code]:overflow-x-auto [&_pre_code]:text-sm
                  [&_:not(pre)>code]:text-[var(--color-text-secondary)] [&_:not(pre)>code]:bg-[var(--color-surface-lighter)] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none
                  prose-img:rounded-lg
                  prose-blockquote:border-[var(--color-accent)] prose-blockquote:bg-[var(--color-surface-light)] prose-blockquote:rounded-r-lg prose-blockquote:py-1
                  prose-ul:text-[var(--color-text-secondary)]
                  prose-ol:text-[var(--color-text-secondary)]
                  prose-li:marker:text-[var(--color-accent)]
                  prose-table:text-sm prose-table:text-[var(--color-text)]
                  prose-th:bg-[var(--color-surface-light)] prose-th:px-4 prose-th:py-2 prose-th:text-[var(--color-text)]
                  prose-td:px-4 prose-td:py-2 prose-td:border-[var(--color-border)] prose-td:text-[var(--color-text)]"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for markdown rendering
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                      className="px-3 py-1 text-sm rounded-full glass-subtle border border-[var(--color-border)]/30 text-[var(--color-text-muted)]"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {(newerPost || olderPost) && (
                <section className="mt-10">
                  <div className="grid gap-4 md:grid-cols-2 mb-6">
                    {newerPost ? (
                      <Link href={`/${getFullSlug(newerPost)}`} className="group block h-full">
                        <div className="relative h-full p-4 rounded-xl border border-[var(--color-border)]/40 bg-[var(--color-surface-light)]/50 overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-surface)]/80 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                          <span className="absolute left-0 top-0 h-full w-1 bg-[var(--color-accent)]/60" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                              {t("post.newerPost")}
                            </span>
                            <svg
                              className="w-4 h-4 text-[var(--color-accent)]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <title>{t("post.newerPost")}</title>
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </div>
                          <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {newerPost.title}
                          </h3>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {formatDate(newerPost.date)}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                    {olderPost ? (
                      <Link href={`/${getFullSlug(olderPost)}`} className="group block h-full">
                        <div className="relative h-full p-4 rounded-xl border border-[var(--color-border)]/40 bg-[var(--color-surface-light)]/50 overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-surface)]/80 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                          <span className="absolute right-0 top-0 h-full w-1 bg-[var(--color-accent)]/60" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                              {t("post.olderPost")}
                            </span>
                            <svg
                              className="w-4 h-4 text-[var(--color-accent)]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <title>{t("post.olderPost")}</title>
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </div>
                          <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {olderPost.title}
                          </h3>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {formatDate(olderPost.date)}
                          </p>
                        </div>
                      </Link>
                    ) : null}
                  </div>
                </section>
              )}

              <CopyCodeButton />

              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold">{t("post.relatedPosts")}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {relatedPosts.map((related) => (
                      <a
                        key={related.slug}
                        href={`/${getFullSlug(related)}`}
                        className="group block h-full"
                      >
                        <div className="h-full p-4 rounded-xl glass-card border border-[var(--color-border)]/50 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                          <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {related.title}
                          </h3>
                          <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">
                            {related.excerpt}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                            <span>{t("post.continueReading")}</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <title>{t("post.continueReading")}</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {post.tocItems.length > 0 && (
              <div className="mt-10 lg:mt-0">
                <TableOfContents items={post.tocItems} />
              </div>
            )}
          </div>
        </div>
        <HeadingLinks copyLabel={t("post.copyHeadingLink")} />
      </article>
      <ContactSection />
    </>
  );
}

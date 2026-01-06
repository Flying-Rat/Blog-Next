import Link from "next/link";
import { BackToPostsLink } from "../../components/blog/BackToPostsLink";
import { BlogFooter } from "../../components/blog/BlogFooter";
import { BlogHeader } from "../../components/blog/BlogHeader";
import { ContactSection } from "../../components/blog/ContactSection";
import { getTranslations } from "../../i18n/server";
import { getAllCategories, getAllPosts, getPostsByCategory } from "../../lib/blog";
import type { PostMeta } from "../../lib/blog-types";
import { formatDate, getAuthors, getFullSlug } from "../../lib/blog-utils";

interface PageProps {
  params: Promise<{ category: string }>;
}

function resolveCategoryLabel(posts: PostMeta[], category: string): string {
  const normalized = category.toLowerCase();
  for (const post of posts) {
    for (const item of post.categories ?? []) {
      if (item.toLowerCase() === normalized) {
        return item;
      }
    }
  }
  return category;
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);
  const allPosts = getAllPosts();
  const label = resolveCategoryLabel(allPosts, decodedCategory);
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1">
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <BackToPostsLink />
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] mb-3">
                {t("taxonomy.categoryTitle")}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{label}</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                {posts.length} {t("taxonomy.postCount")}
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[var(--color-text-muted)] text-lg">{t("taxonomy.noPosts")}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => {
                  const authors = getAuthors(post);
                  return (
                    <Link key={post.slug} href={`/${getFullSlug(post)}`} className="group block">
                      <article className="relative h-full p-6 rounded-xl glass-card border border-[var(--color-border)]/50 overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                        <span className="absolute top-4 right-4 text-6xl font-bold text-[var(--color-surface-lighter)] group-hover:text-[var(--color-accent)]/10 transition-colors duration-300 select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="relative">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories?.map((item) => (
                              <span
                                key={item}
                                className="px-2.5 py-1 text-xs font-medium rounded-full glass-subtle border border-[var(--color-border)]/20 text-[var(--color-text-muted)] group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-accent)] transition-all duration-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-xl font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 pr-12">
                            {post.title}
                          </h2>
                          <p className="text-[var(--color-text-muted)] text-sm mb-6 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-subtle)] sm:text-xs">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                            <span>
                              {post.readingTime} {t("home.minRead")}
                            </span>
                            {authors.length > 0 && (
                              <span className="hidden sm:inline-flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                                <span>{authors.join(", ")}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <ContactSection />
      <BlogFooter />
    </div>
  );
}

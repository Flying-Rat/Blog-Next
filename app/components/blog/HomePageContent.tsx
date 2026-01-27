"use client";

import Link from "next/link";
import { useTranslations } from "../../i18n/client";
import type { PostMeta } from "../../lib/blog-types";
import { formatDate, getAuthors, getFullSlug } from "../../lib/blog-utils";
import { ContactSection } from "./ContactSection";
import { HomePostFilter } from "./HomePostFilter";

interface HomePageContentProps {
  posts: PostMeta[];
}

export function HomePageContent({ posts }: HomePageContentProps) {
  const { t } = useTranslations();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)]/40 glass-card">
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-aurora" />
          <div className="hero-matrix" />
          <svg
            className="hero-schematic"
            viewBox="0 0 900 420"
            role="presentation"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M60 70h260l40 40h220" />
              <path d="M120 300h200l40-40h260l40 40h180" />
              <path d="M620 110h200l40 40" />
              <path d="M220 190h140l40 40h140" />
              <path d="M260 360h180l40-40h220" />
              <circle cx="60" cy="70" r="8" />
              <circle cx="120" cy="300" r="8" />
              <circle cx="620" cy="110" r="8" />
              <circle cx="220" cy="190" r="6" />
              <circle cx="260" cy="360" r="6" />
              <rect x="574" y="104" width="12" height="12" rx="2" />
              <rect x="834" y="294" width="12" height="12" rx="2" />
              <rect x="854" y="144" width="12" height="12" rx="2" />
              <rect x="534" y="224" width="12" height="12" rx="2" />
              <rect x="694" y="314" width="12" height="12" rx="2" />
            </g>
          </svg>
          <div className="hero-grid" />
        </div>
        <div className="container mx-auto px-6 py-16 md:py-24">
          <header className="relative z-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)] mb-4 animate-hero [--animation-delay:0ms]">
              {t("header.techBlog")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-hero [--animation-delay:80ms]">
              {t("home.title")}
            </h1>
            <p className="text-[var(--color-text-muted)] text-lg md:text-xl max-w-2xl leading-relaxed animate-hero [--animation-delay:160ms]">
              {t("home.subtitle")}
            </p>
          </header>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {featuredPost && (
            <Link
              href={`/${getFullSlug(featuredPost)}`}
              className="group block mb-16 md:mb-20 animate-hero [--animation-delay:240ms]"
            >
              <article className="relative p-8 md:p-12 rounded-2xl glass-card border border-[var(--color-border)]/50 overflow-hidden transition-all duration-500 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_60px_-15px_var(--color-accent)]">
                <div className="reduce-motion-gradient absolute inset-0 bg-gradient-to-br from-[var(--color-surface-light)]/80 via-transparent to-[var(--color-accent-dark)]/10 opacity-60" />
                <div className="absolute -bottom-8 left-10 h-24 w-24 rounded-full bg-[var(--color-accent-dark)]/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent)]/70 to-transparent" />
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] text-white bg-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/30">
                  {t("home.latest")}
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {featuredPost.categories?.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2.5 py-1 text-[10px] font-medium rounded-full glass-subtle border border-[var(--color-border)]/30 text-[var(--color-text-muted)] sm:px-3 sm:py-1 sm:text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  <p className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-8 max-w-3xl leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-muted)] sm:text-xs md:text-sm">
                      <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                      <span>
                        {featuredPost.readingTime} {t("home.minRead")}
                      </span>
                      {getAuthors(featuredPost).length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                          <span>{getAuthors(featuredPost).join(", ")}</span>
                        </span>
                      )}
                    </div>

                    <span className="flex items-center gap-2 text-[var(--color-accent)] font-medium opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      {t("home.readArticle")}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>{t("home.readArticle")}</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {otherPosts.length > 0 && <HomePostFilter posts={otherPosts} />}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full glass-card border border-[var(--color-border)]/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[var(--color-text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>{t("home.noPosts")}</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <p className="text-[var(--color-text-muted)] text-lg">{t("home.noPosts")}</p>
            </div>
          )}
        </div>
      </div>

      <ContactSection />
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "../../lib/blog-types";
import { formatDate, getAuthors, getFullSlug } from "../../lib/blog-utils";

interface HomePostFilterProps {
  posts: PostMeta[];
  title: string;
  allLabel: string;
  minReadLabel: string;
  readArticleLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
}

export function HomePostFilter({
  posts,
  title,
  allLabel,
  minReadLabel,
  readArticleLabel,
  searchLabel,
  searchPlaceholder,
}: HomePostFilterProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const post of posts) {
      for (const category of post.categories ?? []) {
        set.add(category);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const segments = [allLabel, ...categories];
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== allLabel) {
      result = result.filter((post) => post.categories?.includes(activeCategory));
    }
    if (!normalizedQuery) {
      return result;
    }
    return result.filter((post) => {
      const authors = post.authors ?? (post.author ? [post.author] : []);
      const haystack = [
        post.title,
        post.excerpt ?? "",
        ...(post.tags ?? []),
        ...(post.categories ?? []),
        ...authors,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, allLabel, normalizedQuery, posts]);

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <fieldset aria-label={title} className="min-w-0">
            <legend className="sr-only">{title}</legend>
            <div className="inline-flex w-full items-center gap-2 rounded-full border border-[var(--color-border)]/40 bg-[var(--color-surface-light)]/60 p-1 glass-subtle overflow-x-auto no-scrollbar sm:w-auto sm:flex-wrap max-w-full">
              {segments.map((segment) => {
                const isActive = segment === activeCategory;
                return (
                  <button
                    key={segment}
                    type="button"
                    onClick={() => setActiveCategory(segment)}
                    className={`whitespace-nowrap px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs ${
                      isActive
                        ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                    }`}
                    aria-pressed={isActive}
                  >
                    {segment}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label htmlFor="post-search" className="sr-only">
            {searchLabel}
          </label>
          <input
            id="post-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full md:w-64 rounded-xl border border-[var(--color-border)]/40 bg-[var(--color-surface-light)]/70 px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post, index) => {
          const authors = getAuthors(post);
          return (
            <Link key={post.slug} href={`/${getFullSlug(post)}`} className="group block">
              <article className="relative h-full p-6 rounded-xl glass-card border border-[var(--color-border)]/50 overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                <span className="absolute top-4 right-4 text-6xl font-bold text-[var(--color-surface-lighter)] group-hover:text-[var(--color-accent)]/10 transition-colors duration-300 select-none">
                  {String(index + 2).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.map((category) => (
                      <span
                        key={category}
                        className="px-2.5 py-1 text-xs font-medium rounded-full glass-subtle border border-[var(--color-border)]/20 text-[var(--color-text-muted)] group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-accent)] transition-all duration-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 pr-12">
                    {post.title}
                  </h3>

                  <p className="text-[var(--color-text-muted)] text-sm mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-subtle)] sm:text-xs">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                    <span>
                      {post.readingTime} {minReadLabel}
                    </span>
                    {authors.length > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-text-subtle)]" />
                        <span>{authors.join(", ")}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>{readArticleLabel}</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}

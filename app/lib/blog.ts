import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Post, PostFrontmatter, PostMeta, TocItem } from "./blog-types";
import { calculateReadingTime } from "./blog-utils";

export type { Post, PostFrontmatter, PostMeta } from "./blog-types";
export { formatDate, getAuthors } from "./blog-utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

type MdNode = {
  type?: string;
  value?: string;
  alt?: string;
  depth?: number;
  children?: MdNode[];
  data?: {
    hProperties?: Record<string, string>;
  };
};

function createSlugger() {
  const counts = new Map<string, number>();

  return (value: string) => {
    const base =
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") || "section";

    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

function getNodeText(node: MdNode | undefined): string {
  if (!node) {
    return "";
  }
  if (typeof node.value === "string") {
    return node.value;
  }
  if (typeof node.alt === "string") {
    return node.alt;
  }
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join("");
  }
  return "";
}

function applyHeadingIdsAndToc(tree: MdNode, toc: TocItem[]) {
  const slugify = createSlugger();

  const visit = (node: MdNode) => {
    if (node.type === "heading") {
      const title = getNodeText(node).trim();
      if (title) {
        const id = slugify(title);
        node.data = node.data || {};
        node.data.hProperties = { ...(node.data.hProperties || {}), id };
        if (node.depth === 2 || node.depth === 3) {
          toc.push({ id, title, depth: node.depth });
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  };

  visit(tree);
}

// Extract slug from Jekyll-style filename (YYYY-MM-DD-slug.md -> slug)
function filenameToSlug(filename: string): string {
  // Remove .md extension if present
  const name = filename.replace(/\.md$/, "");
  // Remove date prefix (YYYY-MM-DD-)
  const match = name.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return match ? match[1] : name;
}

// Get all filenames (without extension)
const getAllFilenames = cache((): string[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
});

// Find filename by slug (SEO-friendly slug without date)
function findFilenameBySlug(slug: string): string | null {
  const filenames = getAllFilenames();
  // First try exact match
  if (filenames.includes(slug)) {
    return slug;
  }
  // Then try to find by slug (without date prefix)
  const found = filenames.find((fn) => filenameToSlug(fn) === slug);
  return found || null;
}

function extractExcerpt(content: string, maxLength = 200): string {
  // Remove markdown headers
  let text = content.replace(/^#{1,6}\s+.+$/gm, "");
  // Remove images
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");
  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  text = text.replace(/`[^`]+`/g, "");
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, "");
  // Remove <!--more--> tag
  text = text.replace(/<!--more-->/g, "");
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  if (text.length > maxLength) {
    text = `${text.slice(0, maxLength).trim()}...`;
  }

  return text;
}

export function getAllPostSlugs(): string[] {
  return getAllFilenames().map(filenameToSlug);
}

const getPostBySlugCached = cache((slug: string): Post | null => {
  const filename = findFilenameBySlug(slug);
  if (!filename) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${filename}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  const toc: TocItem[] = [];
  const processedContent = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: MdNode) => applyHeadingIdsAndToc(tree, toc))
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, {
      aliases: {
        python: ["gdscript", "gd"],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(content);
  const contentHtml = processedContent.toString();

  // Generate excerpt if not provided
  const excerpt = frontmatter.excerpt || extractExcerpt(content);

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  // Use the clean slug (without date prefix)
  const cleanSlug = filenameToSlug(filename);

  return {
    slug: cleanSlug,
    filename,
    ...frontmatter,
    excerpt,
    readingTime,
    content,
    contentHtml,
    tocItems: frontmatter.toc ? toc : [],
  };
});

export function getPostBySlug(slug: string): Post | null {
  return getPostBySlugCached(slug);
}

const getAllPostsCached = cache((): PostMeta[] => {
  const filenames = getAllFilenames();
  const posts = filenames
    .map((filename) => {
      const slug = filenameToSlug(filename);
      const post = getPostBySlug(slug);
      if (!post) {
        return null;
      }
      // Return meta only (without content)
      const { content, contentHtml, tocItems, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
});

export function getAllPosts(): PostMeta[] {
  return getAllPostsCached();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.categories?.some((cat) => cat.toLowerCase() === category.toLowerCase()),
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  for (const post of posts) {
    for (const cat of post.categories || []) {
      categories.add(cat.toLowerCase());
    }
  }
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      tags.add(tag.toLowerCase());
    }
  }
  return Array.from(tags).sort();
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) {
    return [];
  }

  const tags = new Set((current.tags || []).map((tag) => tag.toLowerCase()));
  const categories = new Set((current.categories || []).map((cat) => cat.toLowerCase()));

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;
      for (const tag of post.tags || []) {
        if (tags.has(tag.toLowerCase())) {
          score += 2;
        }
      }
      for (const cat of post.categories || []) {
        if (categories.has(cat.toLowerCase())) {
          score += 1;
        }
      }
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

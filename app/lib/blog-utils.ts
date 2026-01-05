import type { PostMeta } from "./blog-types";

const WORDS_PER_MINUTE = 200;

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, "").replace(/```[\s\S]*?```/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getAuthors(post: PostMeta): string[] {
  if (post.authors) {
    return post.authors;
  }
  if (post.author) {
    return [post.author];
  }
  return [];
}

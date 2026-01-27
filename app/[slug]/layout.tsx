import type { Metadata } from "next";
import { BlogFooter } from "../components/blog/BlogFooter";
import { BlogHeader } from "../components/blog/BlogHeader";
import { ReadingAssist } from "../components/blog/ReadingAssist";

export const metadata: Metadata = {
  title: {
    template: "%s | Flying Rat Tech Blog",
    default: "Tech Blog | Flying Rat Studio",
  },
  description:
    "Game development insights, tutorials, and technical deep-dives from Flying Rat Studio.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ReadingAssist />
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}

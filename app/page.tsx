import type { Metadata } from "next";
import { BlogFooter } from "./components/blog/BlogFooter";
import { BlogHeader } from "./components/blog/BlogHeader";
import { HomePageContent } from "./components/blog/HomePageContent";
import { getAllPosts } from "./lib/blog";

export const metadata: Metadata = {
  title: "Tech Blog | Flying Rat Studio",
  description:
    "Game development insights, tutorials, and technical deep dives from Flying Rat Studio. Covering Unreal Engine, Unity, Godot, and more.",
  openGraph: {
    title: "Tech Blog | Flying Rat Studio",
    description: "Game development insights, tutorials, and technical deep dives.",
    url: "https://tech.flying-rat.studio",
    type: "website",
  },
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1">
        <HomePageContent posts={posts} />
      </main>
      <BlogFooter />
    </div>
  );
}

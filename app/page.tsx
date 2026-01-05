import { BlogFooter } from "./components/blog/BlogFooter";
import { BlogHeader } from "./components/blog/BlogHeader";
import { HomePageContent } from "./components/blog/HomePageContent";
import { getAllPosts } from "./lib/blog";

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

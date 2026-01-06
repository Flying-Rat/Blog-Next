import type { NextConfig } from "next";

const legacyPostRedirects = [
  { slug: "welcome-to-our-blog", id: "r7k2m9p4" },
  { slug: "ue-subsystems", id: "x3n8v5q2" },
  { slug: "babylonJS-lessons", id: "t6w1j4h8" },
  { slug: "serialized-pipeline-unity", id: "b9c3f7a1" },
  { slug: "godot4-features-and-improvements", id: "d5s2l6e9" },
  { slug: "godot-itch-plugin", id: "m4y8g1n7" },
  { slug: "godot-godotfest-munich-2025", id: "k1z5w3p6" },
].flatMap(({ slug, id }) => [
  { source: `/post/${slug}.html`, destination: `/${slug}-${id}`, permanent: true },
  { source: `/post/${slug}`, destination: `/${slug}-${id}`, permanent: true },
]);

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  reactCompiler: true,
  poweredByHeader: false,
  allowedDevOrigins: ["localhost"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  async redirects() {
    return legacyPostRedirects;
  },
} satisfies NextConfig;

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  reactCompiler: true,
  poweredByHeader: false,
  allowedDevOrigins: ["localhost"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // Handle .html suffix for SEO compatibility with old Jekyll URLs
  async rewrites() {
    return [
      {
        source: "/post/:slug.html",
        destination: "/post/:slug",
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;

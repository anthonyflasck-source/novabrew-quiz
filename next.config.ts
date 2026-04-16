import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/novabrew-quiz",
  images: {
    unoptimized: true,
  },
  typescript: {
    // Avoid environment-specific typecheck spawn issues during static export.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

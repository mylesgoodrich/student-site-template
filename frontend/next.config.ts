import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages preview (set OUTPUT_EXPORT=true in workflow)
  ...(process.env.OUTPUT_EXPORT === "true" && { output: "export" as const }),
  ...(process.env.OUTPUT_EXPORT === "true" && {
    images: { unoptimized: true },
  }),
  ...(process.env.NEXT_PUBLIC_BASE_PATH && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  }),
};

export default nextConfig;

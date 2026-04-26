import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    cssChunking: true,
  }
};


export default nextConfig;

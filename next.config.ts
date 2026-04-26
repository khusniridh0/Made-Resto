import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    cssChunking: true,
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  compress: true,
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp|avif)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};


export default nextConfig;

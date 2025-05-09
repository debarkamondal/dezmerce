import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "prod-img.thesouledstore.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_URL as string,
      },
    ],
  },
};

export default nextConfig;

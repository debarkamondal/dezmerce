import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
      }
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_URL as string,
      },
    ],
  },
};

export default nextConfig;

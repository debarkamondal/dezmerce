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
                hostname: "prod-img.thesouledstore.com"
            },
            {
                protocol: "https",
                hostname: "dezmercebackendstack-test-dezmercebackendbucket8d6-7xrgcespfc7r.s3.ap-south-1.amazonaws.com"
            }
        ],
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: process.env.PRODUCT_IMAGE_HOST ?? "localhost",
      }
    ],
  },
};

export default nextConfig;

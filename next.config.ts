import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.drz.lazcdn.com",
      },
    ],
  },
};

export default nextConfig;

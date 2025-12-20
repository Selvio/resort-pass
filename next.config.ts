import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.resortpass.com",
      },
    ],
  },
};

export default nextConfig;

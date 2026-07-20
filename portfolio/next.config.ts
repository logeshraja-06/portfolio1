import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/contact",
        destination: "http://localhost:5000/api/contact",
      },
    ];
  },
};

export default nextConfig;

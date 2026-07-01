/* eslint-env node */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    return [
      {
        source: "/view/:id",
        destination: `${API_URL}/view/:id`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w.wallhaven.cc",
        pathname: "/full/**",
      },
    ],
  },
};

export default nextConfig;
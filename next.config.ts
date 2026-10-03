import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // custom 404 page for URLs outside /en and /de (see src/app/global-not-found.tsx)
    globalNotFound: true,
  },
};

export default nextConfig;

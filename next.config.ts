import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/con',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

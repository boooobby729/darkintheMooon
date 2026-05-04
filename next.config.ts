import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/darkintheMooon',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

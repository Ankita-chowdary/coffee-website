import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/coffee-website' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/coffee-website' : '',
  },
};

export default nextConfig;

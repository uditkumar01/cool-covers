/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MIN_CACHE_AGE_IN_SECS: process.env.MIN_CACHE_AGE_IN_SECS,
    MAX_CACHE_AGE_IN_SECS: process.env.MAX_CACHE_AGE_IN_SECS,
    PATTERN_DIR_URL: process.env.PATTERN_DIR_URL,
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;

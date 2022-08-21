/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MIN_CACHE_AGE_IN_SECS: process.env.MIN_CACHE_AGE_IN_SECS,
    MAX_CACHE_AGE_IN_SECS: process.env.MAX_CACHE_AGE_IN_SECS,
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["github-cool-covers.vercel.app", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;

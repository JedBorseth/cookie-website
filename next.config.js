/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeimg.com", "cdn.sanity.io", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;

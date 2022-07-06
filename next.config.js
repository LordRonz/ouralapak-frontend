/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
  images: {
    domains: ['robohash.org'],
  },
};

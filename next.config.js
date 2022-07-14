/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
  images: {
    domains: ['robohash.org', 'cdn.myanimelist.net', '101.50.0.50'],
  },
};

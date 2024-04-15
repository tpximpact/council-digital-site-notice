/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
      tls: false,
      fs: false,
      child_process: false,
    };
    return config;
  },
  env: {},
};

module.exports = nextConfig;

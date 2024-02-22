/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/undefined/feedback',
        destination: '/',
        permanent: true
      },
      {
        source: '/undefined',
        destination: '/',
        permanent: true
      }
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, tls: false, fs: false, child_process: false };
    return config;
  },
  env: {},
}

module.exports = nextConfig
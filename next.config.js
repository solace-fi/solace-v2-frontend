/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.solace.fi'],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}

module.exports = nextConfig

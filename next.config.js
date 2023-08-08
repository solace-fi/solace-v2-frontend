/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['assets.solace.fi'],
  //   path: 'https://assets.solace.fi/',
  //   loader: 'akamai',
  // },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  output: 'export',
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

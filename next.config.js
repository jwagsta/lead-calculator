/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/lead-calculator',
  assetPrefix: '/lead-calculator/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

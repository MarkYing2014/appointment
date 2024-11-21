/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: false // Disable SWC minification to avoid build issues
};

module.exports = nextConfig;
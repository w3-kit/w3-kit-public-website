/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'upload.wikimedia.org',
      'logos-world.net',
      '1000logos.net',
      'cdn.iconscout.com',
      'cdn-images-1.medium.com'
    ],
  },
};

module.exports = nextConfig;
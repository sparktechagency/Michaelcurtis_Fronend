/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.66.29.135.26.nip.io', 'ui-avatars.com', 'api.coveragegrader.com'],
  },
};

module.exports = nextConfig;

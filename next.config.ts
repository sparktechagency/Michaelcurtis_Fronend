/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["ui-avatars.com", "http://api.66.29.135.26.nip.io"], // add any external host you use
  },
};

module.exports = nextConfig;

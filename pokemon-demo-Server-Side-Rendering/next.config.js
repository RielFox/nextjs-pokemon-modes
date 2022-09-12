/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // webpack: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false, net: false };

  //   return config;
  // },
}


module.exports = nextConfig

/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  babel: {
    plugins: [["styled-components", { ssr: true }]],
  },
};

module.exports = nextConfig;

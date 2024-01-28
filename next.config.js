/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:3005",
  },
};

module.exports = nextConfig;

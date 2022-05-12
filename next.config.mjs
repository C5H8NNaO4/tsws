import { withContentlayer } from 'next-contentlayer';
// import next from 'next';

const basePath = process.env.NODE_ENV === 'production' ? '/tsws_back' : '';
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  basePath,
  // assetPrefix: basePath,
  generateEtags: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  middlewareSourceMaps: false,
  publicRuntimeConfig: {
    basePath,
  },
  compress: process.env.NODE_ENV === 'production',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },

  experimental: {
    serverComponents: false,
    // runtime: "edge",
    cpus: 6,
    optimizeCss: false,
    workerThreads: true,
    outputStandalone: true,
    nextScriptWorkers: false,
  },

  webpack: function(config, options) {
    config.cache = process.env.NODE_ENV === 'production';
    // config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
    config.experiments = { asyncWebAssembly: true };

    return config;
  },
};
export default withContentlayer(nextConfig);

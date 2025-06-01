import type { NextConfig } from "next";
import "dotenv/config";
const internalSecurityHeaders = require("./base-csp");

interface ConfigOptions {
  analyzeBundle?: boolean;
  extraImageDomains?: string[];
  isProduction?: boolean;
  nextConfig?: NextConfig;
}

const defaultImageDomains: string[] = [];

const createNextConfig = (options: ConfigOptions = {}): NextConfig => {
  const {
    analyzeBundle = false,
    extraImageDomains = [],
    isProduction = false,
    nextConfig = {},
  } = options;

  const bundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: analyzeBundle,
  });

  const baseConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
      domains: [...defaultImageDomains, ...extraImageDomains],
    },
    transpilePackages: [],
    experimental: {
      scrollRestoration: true,
    },
    async redirects() {
      let redirectsArray: any[] = [];
      if (isProduction) {
        redirectsArray.push({
          source: "/:path*",
          has: [{ type: "host", value: "YOURDOMAIN.com" }],
          destination: "https://www.YOURDOMAIN.com/:path*",
          permanent: true,
        });
      }
      return redirectsArray;
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: internalSecurityHeaders,
        },
        {
          source: "/:all*(ttf|otf|woff|woff2)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ];
    },
  };

  return bundleAnalyzer({ ...baseConfig, ...nextConfig });
};

export default createNextConfig;

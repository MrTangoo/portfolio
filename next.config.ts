import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // The root layout lives under app/[lang]; this provides a 404 for
    // requests that match no route at all.
    globalNotFound: true,
  },
  serverExternalPackages: ["nodemailer"],
  // Allows HMR when the dev server is reached through a proxy or IP alias.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      // Single canonical host: www.maxime-derbigny.ch → maxime-derbigny.ch
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.maxime-derbigny.ch" }],
        destination: "https://maxime-derbigny.ch/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

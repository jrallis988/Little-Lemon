/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/write-in-faq",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/neta",
        destination: "/",
        permanent: false,
      },
      {
        source: "/neta/",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

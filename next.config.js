/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/write-in-faq",
        destination: "/faq",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/neta", destination: "/neta/index.html" },
      { source: "/neta/", destination: "/neta/index.html" },
    ];
  },
};

module.exports = nextConfig;

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
};

module.exports = nextConfig;

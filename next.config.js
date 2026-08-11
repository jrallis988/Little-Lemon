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

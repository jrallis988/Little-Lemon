import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "*.serveousercontent.com",
    "*.serveo.net",
    "*.loca.lt",
    "*.trycloudflare.com",
    "*.localhost.run",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;

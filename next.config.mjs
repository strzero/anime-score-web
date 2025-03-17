/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
      AS_API_URL: process.env.AS_API_URL ?? "http://localhost:5100",
    },
  };
  

export default nextConfig;

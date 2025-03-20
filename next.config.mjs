/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      AS_API_URL: process.env.AS_API_URL, // 让环境变量可在前端访问
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,  // This will skip ESLint checks during the build process
  },
};

export default nextConfig;

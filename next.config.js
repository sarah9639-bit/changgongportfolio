/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ESLint 오류가 있어도 빌드가 진행되도록 설정
  eslint: {
    // Warning instead of error during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 
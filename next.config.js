/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // 정적 내보내기에 필요
  },
  // ESLint 오류가 있어도 빌드가 진행되도록 설정
  eslint: {
    // Warning instead of error during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 
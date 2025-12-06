/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['design.gemcoder.com', 'res.gemcoder.com', 'cdn.bootcdn.net'],
    unoptimized: true, // 静态导出时需要关闭图片优化
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  swcMinify: true,
  // 添加基础路径配置，用于Capacitor
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
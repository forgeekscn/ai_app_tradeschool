import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '校园生活平台',
  description: '校园生活平台 - 二手交易、兴趣小组、内容社区的综合服务平台',
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#3B82F6',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: '校园生活平台',
    description: '校园生活平台 - 二手交易、兴趣小组、内容社区的综合服务平台',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
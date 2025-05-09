import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "노예은 노무사",
  description: "근로자와 사업주 모두를 위한 전문적인 노무 컨설팅을 제공합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-white dark:bg-[#1c1c1c]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

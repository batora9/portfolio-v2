import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-notosansjp',
});

export const metadata: Metadata = {
  title: {
    template: "%s | ばとらの部屋",
    default: "ばとらの部屋",
  },
  description: "ばとらのポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={clsx(notoSansJP.variable, inter.variable)}>{children}</body>
    </html>
  );
}

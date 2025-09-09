/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的エクスポートを有効にする
  trailingSlash: true,
  images: {
    unoptimized: true, // 静的エクスポート時に必要
  },
  // 静的エクスポート時はAPI routesは使用不可のためrewritesをコメントアウト
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/ogp/:slug.png",
  //       destination: "/api/ogp/:slug",
  //     },
  //   ];
  // },
};

export default nextConfig;

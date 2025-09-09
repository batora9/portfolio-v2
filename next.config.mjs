/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // OGP API を使用するため一時的にコメントアウト
  async rewrites() {
    return [
      {
        source: "/api/ogp/:slug.png",
        destination: "/api/ogp/:slug",
      },
    ];
  },
};

export default nextConfig;

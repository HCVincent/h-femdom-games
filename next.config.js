/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public,s-maxage=600,stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

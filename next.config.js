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
            value: "public,max-age=300,s-maxage=600,stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

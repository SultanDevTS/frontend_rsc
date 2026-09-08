import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  experimental: {
    // Router Cache: 0 detik untuk halaman dynamic agar router.refresh()
    // di CommentForm dan LikeButton langsung re-fetch dari server.
    // Tanpa ini, komentar/like baru tidak muncul setelah submit.
    staleTimes: {
      dynamic: 0,  // halaman dengan fetch/async: tidak di-cache
      static: 180, // halaman statis: cache 3 menit
    },
  },

  // Optimasi gambar dari domain eksternal
  images: {
    remotePatterns: [
      // ── Backend development (localhost) ──────────────────
      {
        protocol: "http",
        hostname: "localhost",
        port: "3008",
      },
      // ── Backend Docker service (production) ──────────────
      {
        protocol: "http",
        hostname: "backend",
        port: "3008",
      },
      // ── Backend production (VPS via domain) ──────────────
      {
        protocol: "https",
        hostname: "news.beritauptodate.my.id",
      },


      // ── CDN Detik.com (sumber gambar seeder data) ─────────
      {
        protocol: "https",
        hostname: "akcdn.detik.net.id",
      },
      {
        protocol: "https",
        hostname: "*.detik.net.id",
      },
    ],
    // Format modern untuk performa LCP
    formats: ["image/avif", "image/webp"],
    // Device sizes untuk responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compress response untuk performa
  compress: true,

  // Production-safe: disable x-powered-by header
  poweredByHeader: false,

  // Strict mode React untuk mendeteksi bug
  reactStrictMode: true,

  // Headers keamanan untuk production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  
};

export default nextConfig;



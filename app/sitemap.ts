import type { MetadataRoute } from "next";
import { getArticles, getCategories } from "@/lib/api";
import type { Article } from "@/lib/api";

/**
 * Mengambil SELURUH artikel dari API dengan pagination loop.
 * Aman untuk artikel berapapun — tidak tergantung pada limit hardcode.
 */
async function fetchAllArticles(): Promise<Article[]> {
  const PAGE_SIZE = 100; // Ambil 100 per request untuk efisiensi
  const allArticles: Article[] = [];
  let currentPage = 1;

  while (true) {
    const res = await getArticles({ page: currentPage, limit: PAGE_SIZE });

    // Tambahkan artikel halaman ini ke akumulasi
    allArticles.push(...res.data);

    // Berhenti jika sudah halaman terakhir
    if (currentPage >= res.meta.totalPages) break;

    currentPage++;
  }

  return allArticles;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Fetch semua data untuk sitemap secara paralel
  const [allArticles, categories] = await Promise.all([
    fetchAllArticles(),
    getCategories(),
  ]);

  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Halaman kategori
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Halaman artikel — sekarang mencakup SEMUA artikel, bukan hanya 1000 pertama
  const articlePages: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${siteUrl}/berita/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}

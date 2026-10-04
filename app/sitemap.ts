import type { MetadataRoute } from "next";

import { getArticles, getCategories } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import type { Article } from "@/lib/types";

async function fetchAllArticles(): Promise<Article[]> {
  const PAGE_SIZE = 100;
  const allArticles: Article[] = [];
  let currentPage = 1;

  while (true) {
    const res = await getArticles({
      page: currentPage,
      limit: PAGE_SIZE,
    });

    allArticles.push(...res.data);

    if (currentPage >= res.meta.totalPages) {
      break;
    }

    currentPage++;
  }

  return allArticles;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_URL;

  const [allArticles, categories] = await Promise.all([
    fetchAllArticles(),
    getCategories(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/kategori/${category.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${siteUrl}/berita/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}

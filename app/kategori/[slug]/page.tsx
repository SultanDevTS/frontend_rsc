import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCategoryBySlug, getArticles } from "@/lib/api";
import type { Article } from "@/lib/types";
import { SITE_NAME } from "@/lib/constants";

import ArticleCard from "@/components/article/ArticleCard";
import CategoryHeader from "@/components/kategori/CategoryHeader";
import FilterBar from "@/components/kategori/FilterBar";
import Pagination from "@/components/kategori/Pagination";

import AdBillboard from "@/components/ads/AdBillboard";
import AdMediumRect from "@/components/ads/AdMediumRect";
import AdInFeed from "@/components/ads/AdInFeed";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
};

function buildFeedItems(articles: Article[], every: number = 3) {
  const items: Array<{ kind: "article"; data: Article } | { kind: "ad" }> = [];

  articles.forEach((article, index) => {
    items.push({
      kind: "article",
      data: article,
    });

    if ((index + 1) % every === 0 && index + 1 < articles.length) {
      items.push({ kind: "ad" });
    }
  });

  return items;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  const currentPage = Math.max(1, Number(page) || 1);
  const path = `/kategori/${slug}`;
  const canonical = currentPage > 1 ? `${path}?page=${currentPage}` : path;
  const description = `Baca berita terbaru dalam kategori ${category.name}`;

  return {
    title:
      currentPage > 1
        ? `Kategori: ${category.name} - Halaman ${currentPage}`
        : `Kategori: ${category.name}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `Kategori: ${category.name} | ${SITE_NAME}`,
      description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: "id_ID",
    },
  };
}

export default async function KategoriPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page, sort } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const currentSort = sort === "oldest" ? "oldest" : "newest";

  const [category, articlesRes] = await Promise.all([
    getCategoryBySlug(slug),

    getArticles({
      category: slug,
      page: currentPage,
      sort: currentSort,
    }),
  ]);

  if (!category) {
    notFound();
  }

  const articles = articlesRes.data;
  const feedItems = buildFeedItems(articles, 6);

  const paginationParams: Record<string, string> = {};

  if (sort === "oldest") {
    paginationParams.sort = "oldest";
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <CategoryHeader
        category={category}
        totalArticles={articlesRes.meta.total}
      />

      <AdBillboard />

      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-6">
          {feedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {feedItems.map((item, index) =>
                item.kind === "article" ? (
                  <ArticleCard key={item.data.id} article={item.data} />
                ) : (
                  <div key={`ad-infeed-${index}`} className="col-span-full">
                    <AdInFeed />
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-16">
              Belum ada artikel dalam kategori ini.
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={articlesRes.meta.totalPages}
            basePath={`/kategori/${slug}`}
            searchParams={paginationParams}
          />
        </div>

        <aside className="w-full lg:w-[300px] shrink-0 space-y-6">
          <AdMediumRect />
          <AdMediumRect />
        </aside>
      </div>
    </div>
  );
}

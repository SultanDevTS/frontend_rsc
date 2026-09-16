import { Suspense } from "react";
import type { Metadata } from "next";
import AdBillboard from "@/components/ads/AdBillboard.client";
import CategoryFilterSection from "@/components/home/CategoryFilterSection";
import ArticleFeedSection from "@/components/home/ArticleFeedSection";
import {
  CategoryFilterSkeleton,
  ArticleFeedSkeleton,
} from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Beranda | BeritaUpToDate",
  description: "Baca berita terkini dari berbagai kategori",
};

type HomePageProps = {
  searchParams: Promise<{ search?: string; category?: string }>;
};

/**
 * Root page — Server Component.
 *
 * Tidak melakukan fetch apapun secara langsung.
 * Setiap bagian konten dibungkus Suspense boundary sendiri agar
 * bisa streaming secara independen:
 *
 *  1. CategoryFilterSection  → streaming setelah getCategories() selesai
 *  2. ArticleFeedSection     → streaming setelah getArticles() selesai
 *
 * Shell halaman (wrapper div + AdBillboard) langsung tampil tanpa blocking.
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const { search, category } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
<<<<<<< HEAD
=======
      {/* ── HERO SECTION ───────────────────────────── */}
      {featuredArticle && (
        <section>
          <Link href={`/berita/${featuredArticle.slug}`}>
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden group">
              {featuredArticle.thumbnail ? (
                <Image
                  src={featuredArticle.thumbnail}
                  alt={featuredArticle.title}
                  fill
                  preload
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-lg">
                  No Image
                </div>
              )}
              {/* Overlay gelap di bawah agar teks terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
>>>>>>> 41fc9f56035bb0386faf87930ed33ac97cfe0181

      {/* ── FILTER KATEGORI ────────────────────────────────────────────────── */}
      {/* Suspense boundary terpisah: streaming segera setelah getCategories()  */}
      {/* selesai, tanpa menunggu getArticles().                                */}
      <Suspense fallback={<CategoryFilterSkeleton />}>
        <CategoryFilterSection category={category} />
      </Suspense>

      {/* ── BILLBOARD AD ───────────────────────────────────────────────────── */}
      {/* Tidak ada fetch → langsung render bersama shell.                      */}
      {!search && <AdBillboard />}

      {/* ── HERO + GRID ARTIKEL + SIDEBAR ──────────────────────────────────── */}
      {/* Suspense boundary terpisah: streaming setelah getArticles() selesai.  */}
      {/* ArticleFeedSkeleton menampilkan hero placeholder + 6 card skeleton    */}
      {/* agar layout tidak loncat (CLS = 0).                                  */}
      <Suspense fallback={<ArticleFeedSkeleton />}>
        <ArticleFeedSection search={search} category={category} />
      </Suspense>

    </div>
  );
}

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

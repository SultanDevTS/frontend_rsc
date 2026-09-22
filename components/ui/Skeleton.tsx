// components/ui/Skeleton.tsx — Server Component
// Skeleton library: primitif + named exports siap pakai per bagian UI
// Semua komponen di file ini adalah Server Component (tidak ada hook/event).

import React from "react";

// ─── PRIMITIF ────────────────────────────────────────────────────────────────

type SkeletonBoxProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

/** Blok skeleton dasar. Default export agar kompatibel dengan import lama. */
export default function Skeleton({
  className = "",
  width,
  height,
}: SkeletonBoxProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`bg-gray-200 rounded ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/** Alias named export — bisa dipakai sebagai <SkeletonBox /> */
export { Skeleton as SkeletonBox };

// ─── KARTU ARTIKEL ───────────────────────────────────────────────────────────

/**
 * Skeleton kartu artikel standar.
 * Dipakai di: HomeLoading (×6), KategoriLoading (×9).
 * Dimensi thumbnail h-48 = 192 px, sesuai ArticleCard.tsx.
 */
export function ArticleCardSkeleton() {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
      aria-hidden="true"
    >
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* Category badge */}
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        {/* Title — 2 baris */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
        </div>
        {/* Author + date */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── KARTU RELATED ───────────────────────────────────────────────────────────

/**
 * Skeleton kartu artikel "Baca Juga".
 * Dipakai di: BeritaDetailLoading (×3).
 * Layout sama dengan ArticleCardSkeleton.
 */
export function RelatedCardSkeleton() {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
      aria-hidden="true"
    >
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

/**
 * Skeleton sidebar kanan — 2 blok persegi 250 px.
 * Dipakai di: HomeLoading, KategoriLoading.
 */
export function SidebarSkeleton() {
  return (
    <aside
      className="w-full lg:w-[300px] shrink-0 space-y-6"
      aria-hidden="true"
    >
      <div className="w-full h-[250px] rounded-xl bg-gray-200" />
      <div className="w-full h-[250px] rounded-xl bg-gray-200" />
    </aside>
  );
}

// ─── PAGINATION ──────────────────────────────────────────────────────────────

/**
 * Skeleton baris paginasi: tombol prev + 5 angka + tombol next.
 * Dipakai di: KategoriLoading.
 */
export function PaginationSkeleton({ pages = 5 }: { pages?: number }) {
  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-hidden="true"
    >
      {/* Prev */}
      <div className="w-9 h-9 rounded-lg bg-gray-200" />
      {/* Page numbers */}
      {Array.from({ length: pages }).map((_, i) => (
        <div key={i} className="w-9 h-9 rounded-lg bg-gray-200" />
      ))}
      {/* Next */}
      <div className="w-9 h-9 rounded-lg bg-gray-200" />
    </nav>
  );
}

// ─── FILTER KATEGORI ─────────────────────────────────────────────────────────

/**
 * Skeleton baris filter kategori: label + pill "Semua" + 5 pill kategori.
 * Dipakai sebagai fallback <Suspense> di CategoryFilterSection.
 * Dimensi pill disesuaikan dengan layout asli di page.tsx.
 */
export function CategoryFilterSkeleton() {
  return (
    <section aria-hidden="true">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Label "Kategori:" */}
        <div className="h-4 w-16 bg-gray-200 rounded mr-2" />
        {/* Pill "Semua" */}
        <div className="h-8 w-16 rounded-full bg-gray-200" />
        {/* 5 pill kategori, lebar bervariasi */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 rounded-full bg-gray-200"
            style={{ width: `${64 + i * 12}px` }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── ARTICLE FEED ─────────────────────────────────────────────────────────────

/**
 * Skeleton untuk seluruh section artikel beranda:
 * hero placeholder + heading + grid 6 kartu + sidebar.
 * Dipakai sebagai fallback <Suspense> di ArticleFeedSection.
 */
export function ArticleFeedSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero placeholder */}
      <section aria-hidden="true">
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gray-200" />
      </section>

      {/* Main content + sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT: artikel grid */}
        <section className="flex-1 min-w-0 space-y-4" aria-hidden="true">
          <div className="flex items-center justify-between">
            <div className="h-6 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* RIGHT: sidebar */}
        <SidebarSkeleton />
      </div>
    </div>
  );
}

// ─── KOMENTAR ────────────────────────────────────────────────────────────────

/**
 * Skeleton satu item komentar: nama + tanggal + 2 baris teks.
 * Dipakai di: BeritaDetailLoading (×3).
 */
export function CommentItemSkeleton() {
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-4 space-y-2"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-100 rounded" />
      </div>
      <div className="space-y-1">
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-4/5 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

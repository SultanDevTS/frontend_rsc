// app/kategori/[slug]/loading.tsx — Kategori Page Skeleton (Server Component)
// Dimensi tetap sesuai layout asli untuk mencegah CLS.
// Skeleton primitif diimpor dari @/components/ui/Skeleton agar tidak duplikat.

import {
  ArticleCardSkeleton,
  SidebarSkeleton,
  PaginationSkeleton,
} from "@/components/ui/Skeleton";

export default function KategoriLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 animate-pulse">

      {/* ── CATEGORY HEADER SKELETON ──────────────────── */}
      <div className="space-y-2" aria-hidden="true">
        {/* ← Kembali ke Beranda */}
        <div className="h-4 w-36 bg-gray-200 rounded" />
        {/* h1: Kategori: [Nama] */}
        <div className="h-9 w-72 bg-gray-200 rounded" />
        {/* N artikel ditemukan */}
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>

      {/* ── BILLBOARD AD SKELETON ─────────────────────── */}
      <div
        className="w-full h-[90px] rounded-xl bg-gray-100 border border-gray-100"
        aria-hidden="true"
      />

      {/* ── FILTER BAR SKELETON ───────────────────────── */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
        <div className="h-8 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT: Article Grid + Pagination */}
        <div className="flex-1 min-w-0 space-y-6" aria-hidden="true">
          {/* 3-column article grid — 9 kartu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>

          {/* Pagination */}
          <PaginationSkeleton pages={5} />
        </div>

        {/* RIGHT: Sidebar */}
        <SidebarSkeleton />
      </div>
    </div>
  );
}

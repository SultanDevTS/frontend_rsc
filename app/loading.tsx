// app/loading.tsx — Home Page Skeleton (Server Component)
// Dimensi tetap sesuai layout asli untuk mencegah CLS.
// Skeleton primitif diimpor dari @/components/ui/Skeleton agar tidak duplikat.

import {
  ArticleCardSkeleton,
  SidebarSkeleton,
} from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">

      {/* ── HERO SKELETON ───────────────────────────── */}
      <section aria-hidden="true">
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gray-200" />
      </section>

      {/* ── BILLBOARD AD SKELETON ─────────────────── */}
      <div
        className="w-full h-[90px] rounded-xl bg-gray-100 border border-gray-100"
        aria-hidden="true"
      />

      {/* ── FILTER KATEGORI SKELETON ────────────────── */}
      <section aria-hidden="true">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="h-4 w-16 bg-gray-200 rounded mr-2" />
          {/* Pill "Semua" */}
          <div className="h-8 w-16 rounded-full bg-gray-200" />
          {/* Pill kategori (5 buah, lebar bervariasi) */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-gray-200"
              style={{ width: `${64 + i * 12}px` }}
            />
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ─────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT: Article Grid */}
        <section className="flex-1 min-w-0 space-y-4" aria-hidden="true">
          {/* Section heading */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>

          {/* 3-column article grid — 6 kartu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* RIGHT: Sidebar */}
        <SidebarSkeleton />
      </div>
    </div>
  );
}

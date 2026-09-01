// app/loading.tsx — Home Page Skeleton
// Dimensi tetap sesuai layout asli untuk mencegah CLS

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">

      {/* ── HERO SKELETON ───────────────────────────── */}
      <section>
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gray-200" />
      </section>

      {/* ── BILLBOARD AD SKELETON ─────────────────── */}
      <div className="w-full h-[90px] rounded-xl bg-gray-100 border border-gray-100" />

      {/* ── FILTER KATEGORI SKELETON ────────────────── */}
      <section>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="h-4 w-16 bg-gray-200 rounded mr-2" />
          {/* Pill "Semua" */}
          <div className="h-8 w-16 rounded-full bg-gray-200" />
          {/* Pill kategori */}
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
        <section className="flex-1 min-w-0 space-y-4">
          {/* Section heading */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>

          {/* 3-column article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* RIGHT: Sidebar */}
        <aside className="w-full lg:w-[300px] shrink-0 space-y-6">
          <div className="w-full h-[250px] rounded-xl bg-gray-200" />
          <div className="w-full h-[250px] rounded-xl bg-gray-200" />
        </aside>
      </div>
    </div>
  );
}

/** Reusable card skeleton — mencerminkan ArticleCard.tsx */
function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-200" />

      <div className="p-4 space-y-3">
        {/* Category badge */}
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        {/* Title */}
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

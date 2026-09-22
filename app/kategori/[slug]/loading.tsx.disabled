// app/kategori/[slug]/loading.tsx — Category Page Skeleton
// Mencerminkan layout KategoriPage: header kategori → filter → grid artikel → pagination → sidebar

export default function KategoriLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6 animate-pulse">

      {/* ── CATEGORY HEADER SKELETON ──────────────────── */}
      <div className="space-y-2">
        {/* ← Kembali ke Beranda */}
        <div className="h-4 w-36 bg-gray-200 rounded" />
        {/* h1: Kategori: [Nama] */}
        <div className="h-9 w-72 bg-gray-200 rounded" />
        {/* N artikel ditemukan */}
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>

      {/* ── BILLBOARD AD SKELETON ─────────────────────── */}
      <div className="w-full h-[90px] rounded-xl bg-gray-100 border border-gray-100" />

      {/* ── FILTER BAR SKELETON ───────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
        <div className="h-8 w-32 rounded-lg bg-gray-200" />
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT: Article Grid */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* 3-column article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>

          {/* ── PAGINATION SKELETON ─────────────────────── */}
          <nav className="flex items-center justify-center gap-1">
            {/* Prev chevron */}
            <div className="w-9 h-9 rounded-lg bg-gray-200" />
            {/* Page numbers */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-9 h-9 rounded-lg bg-gray-200" />
            ))}
            {/* Next chevron */}
            <div className="w-9 h-9 rounded-lg bg-gray-200" />
          </nav>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="w-full lg:w-[300px] shrink-0 space-y-6">
          <div className="w-full h-[250px] rounded-xl bg-gray-200" />
          <div className="w-full h-[250px] rounded-xl bg-gray-200" />
        </aside>
      </div>
    </div>
  );
}

/** Reusable card skeleton — sama dengan home page agar CLS konsisten */
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

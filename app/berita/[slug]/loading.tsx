// app/berita/[slug]/loading.tsx — Article Detail Page Skeleton
// Mencerminkan layout BeritaDetailPage: header → thumbnail → konten → like/share → related → komentar

export default function BeritaDetailLoading() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-pulse">

      {/* ── ARTICLE HEADER SKELETON ──────────────────── */}
      <header className="space-y-4">
        {/* Category badge + date */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 rounded-full bg-gray-200" />
          <div className="h-4 w-28 bg-gray-100 rounded" />
        </div>

        {/* Title — 3 baris */}
        <div className="space-y-2">
          <div className="h-8 w-full bg-gray-200 rounded" />
          <div className="h-8 w-11/12 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 bg-gray-100 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </header>

      {/* ── THUMBNAIL SKELETON ─────────────────────────── */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-200" />

      {/* ── MID-ARTICLE AD SKELETON ───────────────────── */}
      <div className="w-full h-[90px] rounded-xl bg-gray-100 border border-gray-100" />

      {/* ── ARTICLE CONTENT SKELETON ──────────────────── */}
      <div className="space-y-3">
        {/* Simulasi paragraf konten artikel */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div
              className="h-4 bg-gray-200 rounded"
              style={{ width: `${75 + (i % 3) * 8}%` }}
            />
          </div>
        ))}
      </div>

      {/* ── LIKE + SHARE BUTTONS SKELETON ─────────────── */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <div className="h-9 w-28 rounded-lg bg-gray-200" />
        <div className="h-9 w-24 rounded-lg bg-gray-200" />
      </div>

      {/* ── RELATED ARTICLES SKELETON ─────────────────── */}
      <section className="space-y-4">
        <div className="h-6 w-36 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <RelatedCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* ── COMMENT SECTION SKELETON ──────────────────── */}
      <section className="space-y-6">
        {/* Heading */}
        <div className="h-6 w-40 bg-gray-200 rounded" />

        {/* Comment form */}
        <div className="space-y-3">
          <div className="h-10 w-full rounded-lg bg-gray-200" />
          <div className="h-20 w-full rounded-lg bg-gray-200" />
          <div className="h-10 w-36 rounded-lg bg-gray-200" />
        </div>

        {/* Comment items */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl p-4 space-y-2"
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
        ))}
      </section>

      {/* ── BACK LINK SKELETON ─────────────────────────── */}
      <div className="pt-6 border-t border-gray-200">
        <div className="h-4 w-36 bg-gray-200 rounded" />
      </div>
    </article>
  );
}

function RelatedCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
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

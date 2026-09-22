// components/home/CategoryFilterSection.tsx — Server Component
// Fetch kategori secara mandiri agar bisa streaming sebelum artikel tiba.

import Link from "next/link";
import { getCategories } from "@/lib/api";

type Props = {
  /** Slug kategori yang sedang aktif, dari searchParams */
  category?: string;
};

export default async function CategoryFilterSection({ category }: Props) {
  const categories = await getCategories();

  return (
    <section>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-500 mr-2">
          Kategori:
        </span>

        {/* Pill "Semua" — reset filter */}
        <Link
          href="/"
          prefetch={false}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
            !category
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
          }`}
        >
          Semua
        </Link>

        {categories.map((cat) => {
          const isActive = cat.slug === category;
          return (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}`}
              prefetch={false}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

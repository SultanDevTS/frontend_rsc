// components/layout/NavMenu.tsx — Server Component

import Link from "next/link";
import { Category } from "@/lib/api";

type Props = {
  categories: Category[];
};

export default function NavMenu({ categories }: Props) {
  return (
    <>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/kategori/${cat.slug}`}
<<<<<<< HEAD
          prefetch={false}
=======
	  prefetch={false}
>>>>>>> 41fc9f56035bb0386faf87930ed33ac97cfe0181
          className="px-3 py-2 text-sm font-medium text-gray-500 rounded-lg whitespace-nowrap
                     hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
        >
          {cat.name}
        </Link>
      ))}
    </>
  );
}

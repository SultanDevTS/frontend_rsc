// ── Shared Types (zero runtime imports — safe to import in Client Components) ──
//
// File ini SENGAJA tidak mengandung runtime import apapun.
// Tujuan: Client Component boleh import dari sini tanpa risiko
// menarik server-only library (seperti sanitize-html) ke client bundle.
//
// Aturan: JANGAN tambahkan runtime import di file ini.

export type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};

export type ArticleCategory = {
  name: string;
  slug: string;
};

export type Article = {
  id: number;
  title: string;
  author: string;
  slug: string;
  content?: string;
  thumbnail: string;
  category: ArticleCategory;
  publishedAt: string;
  likes?: number;
};

export type Comment = {
  id: number;
  articleId: number;
  name: string;
  content: string;
  createdAt: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

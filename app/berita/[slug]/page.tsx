import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getArticleBySlug } from "@/lib/api";

import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import ShareButton from "@/components/article/ShareButton";
import LikeButton from "@/components/article/LikeButton";
import TextSizeControl from "@/components/article/TextSizeControl";
import BookmarkButton from "@/components/article/BookmarkButton";
import RelatedArticles from "@/components/article/RelatedArticle";
import CommentSection from "@/components/comment/CommentSection";
import JsonLd from "@/components/ui/JsonLd";

import { SITE_NAME, SITE_URL } from "@/lib/constants";

import AdArticleMid from "@/components/ads/AdArticleMid";
import AdStickyFooter from "@/components/ads/AdStickyFooter";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const plainText =
    article.content?.replace(/<[^>]*>/g, "").slice(0, 160) ?? "";

  return {
    title: article.title,

    description: plainText,

    alternates: {
      canonical: `/berita/${slug}`,
    },

    openGraph: {
      title: article.title,
      description: plainText,
      type: "article",
      url: `/berita/${slug}`,
      siteName: SITE_NAME,
      locale: "id_ID",
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category.name,

      ...(article.thumbnail && {
        images: [
          {
            url: article.thumbnail,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: plainText,

      ...(article.thumbnail && {
        images: [article.thumbnail],
      }),
    },
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",

    headline: article.title,

    author: {
      "@type": "Person",
      name: article.author,
    },

    datePublished: article.publishedAt,

    // API belum menyediakan updatedAt
    // pada response article detail.
    dateModified: article.publishedAt,

    ...(article.thumbnail && {
      image: [article.thumbnail],
    }),

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/berita/${slug}`,
    },

    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },

    articleSection: article.category.name,
  };

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={jsonLdData} />

      {/* Sticky Footer Ad */}
      <AdStickyFooter />

      <article className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Article Header */}
        <ArticleHeader article={article} />

        {/* Article Thumbnail */}
        {article.thumbnail && (
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Mid Article Advertisement */}
        <AdArticleMid />

        {/* Reading Toolbar: Pengaturan ukuran teks dan bookmark cepat */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-gray-200">
          <TextSizeControl />

          <div className="flex items-center gap-2">
            <BookmarkButton
              articleId={article.id}
              title={article.title}
              slug={article.slug}
            />

            <ShareButton title={article.title} slug={article.slug} />
          </div>
        </div>

        {/* Article Content */}
        {article.content && <ArticleContent content={article.content} />}

        {/* Interactive Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <LikeButton
            articleId={article.id}
            initialLikes={article.likes ?? 0}
          />

          <BookmarkButton
            articleId={article.id}
            title={article.title}
            slug={article.slug}
          />

          <ShareButton title={article.title} slug={article.slug} />
        </div>

        {/* Related Articles */}
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          }
        >
          <RelatedArticles
            categorySlug={article.category.slug}
            excludeSlug={article.slug}
          />
        </Suspense>

        {/* Comments */}
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          }
        >
          <CommentSection articleId={article.id} />
        </Suspense>

        {/* Back Link */}
        <div className="pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="
              text-blue-600
              hover:text-blue-700
              text-sm
              font-medium
              transition-colors
            "
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </article>
    </>
  );
}

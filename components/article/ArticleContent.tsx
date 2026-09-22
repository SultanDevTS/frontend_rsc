// components/article/ArticleContent.tsx — Server Component

import { sanitizeContent } from "@/lib/api";

type Props = {
  content: string;
};

/**
 * Pola paragraf sampah dari scraping berita (iklan, placeholder, watermark)
 * yang harus disembunyikan dari tampilan artikel.
 */
const JUNK_PATTERNS: RegExp[] = [
  /^ADVERTISEMENT$/i,
  /^SCROLL TO CONTINUE WITH CONTENT$/i,
  /^\[Gambas:[^\]]+\]$/i,          // [Gambas:Video CNN], [Gambas:Instagram], dll
  /^Lanjut ke sebelah\.\.\./i,
  /^Baca juga\s*:/i,
  /^\(CNN Indonesia\/[^)]+\)$/i,   // caption foto "(CNN Indonesia/Nama)"
  /^Simak video\s/i,
  /^Lihat juga\s*:/i,
  /^\s*$/, // paragraf kosong
];

/**
 * Deteksi apakah teks paragraf merupakan kutipan langsung.
 * Kutipan biasanya diawali " atau " (smart quote / ASCII).
 */
function isQuoteParagraph(text: string): boolean {
  const trimmed = text.trim();
  return (
    trimmed.startsWith("\u201C") || // "
    trimmed.startsWith('"') ||
    trimmed.startsWith("\u2018") // '
  );
}

/**
 * Bersihkan dan transformasi konten HTML artikel:
 * 1. Strip paragraf sampah (iklan, placeholder)
 * 2. Ubah paragraf kutipan menjadi <blockquote>
 */
function processContent(rawHtml: string): string {
  // Gunakan regex ringan — tidak perlu DOM parser karena kita sudah sanitize
  return rawHtml.replace(/<p>([\s\S]*?)<\/p>/gi, (fullMatch, inner) => {
    // Teks bersih (tanpa tag HTML di dalamnya) untuk pengecekan pola
    const plainText = inner.replace(/<[^>]*>/g, "").trim();

    // Buang paragraf sampah
    const isJunk = JUNK_PATTERNS.some((pattern) => pattern.test(plainText));
    if (isJunk) return "";

    // Ubah menjadi blockquote jika merupakan kutipan langsung
    if (isQuoteParagraph(plainText)) {
      return `<blockquote>${inner}</blockquote>`;
    }

    return fullMatch;
  });
}

export default function ArticleContent({ content }: Props) {
  const safeContent = sanitizeContent(content);
  const processedContent = processContent(safeContent);

  return (
    <div
      className="article-body max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

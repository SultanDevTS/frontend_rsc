"use client";

import "./globals.css";

// Menggantikan root layout saat error terjadi di layout itu sendiri
// (mis. Header gagal fetch kategori). Wajib memuat <html> dan <body>.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <title>Terjadi Kesalahan</title>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Terjadi Kesalahan
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Maaf, situs sedang mengalami gangguan. Silakan coba lagi
                beberapa saat.
              </p>
              {error.digest && (
                <p className="text-gray-400 text-xs">Kode: {error.digest}</p>
              )}
            </div>

            <button
              onClick={() => retry()}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg
                         hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2
                         focus:ring-blue-500 focus:ring-offset-2"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

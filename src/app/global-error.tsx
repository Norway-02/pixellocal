'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Critical System Error</h2>
          <p className="text-gray-600 mb-6">
            An unexpected global application error occurred.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-6xl font-black text-brand-600 dark:text-brand-400 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The tool or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl shadow-md transition-colors"
      >
        Back to Tools Overview
      </Link>
    </div>
  );
}

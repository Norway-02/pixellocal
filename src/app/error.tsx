'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
        We encountered an error processing your request. Your files remain safe on your device.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

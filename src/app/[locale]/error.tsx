'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="mb-6 opacity-75">An unexpected error occurred. Try again, or reload the page.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 rounded-lg bg-black text-white hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#FAFBF9] px-6 py-28 text-center pt-36">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <span className="text-[13px] font-bold uppercase tracking-widest text-[#007580] block mb-2">
          Notice
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-6 font-light">
          An unexpected error occurred while loading this page.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full text-[15px] font-semibold text-[#04333A] bg-[#10CFC9] hover:bg-[#0EB5AF] transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-[15px] font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

